const router       =  require('express').Router();
const sessions     =  require('../controllers/sessions');
const set          =  require('../controllers/sets');
const statics      =  require('../controllers/statics');
const registrations=  require('../controllers/registrations');
const secureRoute  =  require('../lib/secureRoute');



router.route('/')
.get(statics.index);

router.route('/sets')
.get(set.index)
.post(set.create);

router.route('/sets/new')
.get(secureRoute,set.new);

router.route('/sets/:id')
.get(set.show)
.put(secureRoute, set.update)
.delete(secureRoute, set.delete);

router.route('/set/:id/edit')
.get(secureRoute, set.edit);

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/profile')
  .get(secureRoute, registrations.show)
  .put(secureRoute, registrations.update)
  .delete(secureRoute, registrations.delete);

router.route('/profile/edit')
  .get(secureRoute, registrations.edit);

router.route('/login')
.get(sessions.new)
.post(sessions.create);

router.route('/logout')
.get(sessions.delete);


module.exports = router;
