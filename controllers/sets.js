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
  .catch(next);
}

function setsShow(req, res, next) {
  Set
    .findById(req.params.id)
    .populate('createdBy')
    .exec()
    .then((set) => {
      if(!set) return res.status(404).render('statics/404');
      res.render('sets/show', { set });
    })
    .catch(next);
}

function setsEdit(req, res, next) {
  Set
  .findById(req.params.id)
  .then((set) => {
    if(!set) return res.status(404).render('statics/404');
    res.render('sets/edit', {set});
  })
  .catch(next);
}

function setsUpdate(req, res, next) {
  Set
  .findById(req.params.id) //find the set with the id contained in thr request
  .then((set) => { //then, on that found id
    if(!set) return res.status(404).render('statics/404'); //if the id isnt valid, return 404
    for(const field in req.body) { //for every field in req body
      set[field] = req.body[field]; //replace the correspndng field in the db with that in the req
    }
    return set.save(); //save the edited db entry
  })
  .then((set) => res.redirect(`/sets/${set.id}`)) //redirect to the item id
  .catch(next); //move on
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


module.exports = {
  index: setsIndex,
  show: setsShow,
  new: setsNew,
  create: setsCreate,
  edit: setsEdit,
  update: setsUpdate,
  delete: setsDelete
};
