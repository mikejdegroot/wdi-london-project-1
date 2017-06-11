const router       =  require('express').Router();
const sessions     =  require('../controllers/sessions');
const set          =  require('../controllers/sets');
const statics      =  require('../controllers/statics');
const registrations=  require('../controllers/registrations');
// const secureRoute  =  require('../lib/secureRoute');



router.route('/')
.get(statics.index);

router.route('/sets')
.get(set.index)
.post(set.create);

router.route('/sets/new')
.get(set.new);

router.route('/set/:id/edit')
.get(set.edit);

router.route('/sets/:id')
.get(set.show)
.put(set.update)
.delete(set.delete);

router.route('/register')
.get(registrations.new)
.post(registrations.create);

router.route('/login')
.get(sessions.new)
.post(sessions.create);

router.route('/logout')
.get(sessions.delete);


module.exports = router;
