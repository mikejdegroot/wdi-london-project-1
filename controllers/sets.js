const Set = require('../models/set');


function setsIndex(req, res, next) {
  Set
    .find()
    .exec()
    .then((sets) => res.render('sets/index', { sets }))
    .catch(next);
}
function setsShow(req, res, next) {
  Set
    .findById(req.params.id)
    .exec()
    .then((set) => {
      if(!set) return res.status(404).render('statics/404');
      res.render('sets/show', { set });
    })
    .catch(next);
}
module.exports = {
  index: setsIndex,
  show: setsShow
  // new: equipmentsNew,
  // create: equipmentsCreate,
  // edit: equipmentsEdit,
  // update: equipmentsUpdate,
  // delete: equipmentsDelete
};
