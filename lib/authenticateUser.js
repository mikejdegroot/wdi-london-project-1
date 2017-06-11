const User = require('../models/user');


function authenticateUser(req, res, next) {

  if(!req.session.userId) return next();

  User
  .findById(req.session.userId)   //look at the session cookie and find the user
  .then((user) => {

    if(!user) { //if not a user
      return req.session.regenerate(() => res.redirect('/')); //regenerate the cookie, redirect to homepg
    }
    res.locals.user = user;
    res.locals.isLoggedIn = true; //bake is logged in into the cookie, allowing features to be visible
    req.session.userId = user.id; //session cookie id = user id

    next();
  });
}

module.exports = authenticateUser;
