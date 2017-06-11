const router       =  require('express').Router();
// const sessions     =  require('../controllers/sessions');
const set          =  require('../controllers/sets');
const statics      =  require('../controllers/statics');
// const registrations=  require('../controllers/registrations');
// const secureRoute  =  require('../lib/secureRoute');



router.route('/')
.get(statics.index);

router.route('/sets')
.get(set.index)
.post(set.create);

router.route('/sets/new')
.get(set.new);
// .get(secureRoute, set.new);

router.route('/sets/:id')
.get(set.show);
// .put(secureRoute, set.update)
// .delete(secureRoute, set.delete);

module.exports = router;
