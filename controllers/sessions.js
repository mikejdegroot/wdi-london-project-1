const User = require('../models/user');
const oauth = require('../config/oauth');

function sessionsNew(req, res) {
  res.render('sessions/new', { oauth });
}

function sessionsCreate(req, res) {
  User
    .findOne({ email: req.body.email })
    .then((user) => {
      if(!user || !user.validatePassword(req.body.password)) {
        return res.badRequest('/login', 'Incorrect credentials');
      }

      req.session.userId = user.id;
      req.session.isLoggedIn = true;

      req.flash('success', `Welcome back, ${user.username}`);
      return res.redirect('/sets');
    });
}

function sessionsDelete(req, res) {
  return req.session.regenerate(() => res.redirect('/'));
}

module.exports = {
  new: sessionsNew,
  create: sessionsCreate,
  delete: sessionsDelete
};
