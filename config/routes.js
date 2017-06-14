const router       =  require('express').Router();
const sessions     =  require('../controllers/sessions');
const set          =  require('../controllers/sets');
const statics      =  require('../controllers/statics');
const registrations=  require('../controllers/registrations');
const secureRoute  =  require('../lib/secureRoute');
const oauth        = require('../controllers/oauth');
const tracks        = require('../controllers/tracks');

router.route('/tracks')
.get(tracks.proxy);

router.route('/oauth/facebook')
  .get(oauth.facebook);

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

router.route('/sets/:id/edit')
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

router.route('/sets/:id/tracks')
  .post(secureRoute, set.createTrack);

router.route('/sets/:id/tracks/:trackId')
  .delete(secureRoute, set.deleteTrack);

router.route('*')
  .get(statics.notFound);


module.exports = router;
