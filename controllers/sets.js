const Set = require('../models/set');


function setsIndex(req, res, next) {
  Set
  .find()
  .populate('createdBy')
  .exec()
  .then((sets) => res.render('sets/index', { sets }))
  .catch(next);
}

function setsNew(req, res) {
  res.render('sets/new');
}

function setsCreate(req, res, next) {

  req.body.createdBy = req.user;

  Set
  .create(req.body)
  .then(() => res.redirect('/sets'))
  .catch((err) => {
    if(err.name === 'ValidationError') {
      return res.badRequest('/sets/new', err.toString());
    }
    next(err);
  });

}

function setsShow(req, res, next) {
  Set
  .findById(req.params.id)
  .populate('createdBy tracks.createdBy')
  .exec()
  .then((set) => {
    if(!set) return res.status(404).render('statics/404');
    res.render('sets/show', { set });
  })
  .catch(next);
}

function setsEdit(req, res, next) {
  console.log(req.user);
  Set
  .findById(req.params.id)
  .exec()
  .then((set) => {
    if(!set) return res.redirect();
    if(!set.belongsTo(req.user)) return res.unauthorized(`/sets/${set.id}`, 'You do not have permission to edit that resource');
    return res.render('sets/edit', { set });
  })
  .catch(next);

}


function setsUpdate(req, res, next) {
  Set
  .findById(req.params.id) //find the set with the id contained in thr request
  .then((set) => { //then, on that found id
    if(!set) return res.redirect();
    for(const field in req.body) { //for every field in req body
      set[field] = req.body[field]; //replace the correspndng field in the db with that in the req
    }
    return set.save(); //save the edited db entry
  })
  .then((set) => res.redirect(`/sets/${set.id}`))
  .catch((err) => {
    if(err.name === 'ValidationError') {
      return res.badRequest(`/sets/${req.params.id}/edit`, err.toString()); //must be req params id!!!!!!!
    }
    next(err);
  });



}


function setsDelete(req, res, next) {
  Set
  .findById(req.params.id)
  .then((set) => {
    if(!set) return res.status(404).render('statics/404');
    return set.remove();
  })
  .then(() => res.redirect('/sets'))
  .catch(next);
}

function createTrackRoute(req, res, next) {

  req.body.createdBy = req.user;

  Set
  .findById(req.params.id)
  .exec()
  .then((set) => {
    if(!set) return res.notFound();

    set.tracks.push(req.body); // create an embedded record
    return set.save();
  })
  .then((set) => res.redirect(`/sets/${set.id}`))
  .catch((err) => {
    if(err.name === 'ValidationError') {
      return res.badRequest(`/sets/${req.params.id}`, err.toString()); //must be req params id!!!!!!!
    }
    next(err);
  });

}

function deleteTrackRoute(req, res, next) {
  Set
  .findById(req.params.id)
  .exec()
  .then((set) => {
    if(!set) return res.notFound();
    // get the embedded record by it's id
    const comment = set.tracks.id(req.params.trackId);
    comment.remove();

    return set.save();
  })
  .then((set) => res.redirect(`/sets/${set.id}`))
  .catch(next);
}

module.exports = {
  index: setsIndex,
  show: setsShow,
  new: setsNew,
  create: setsCreate,
  edit: setsEdit,
  update: setsUpdate,
  delete: setsDelete,
  createTrack: createTrackRoute,
  deleteTrack: deleteTrackRoute
};
