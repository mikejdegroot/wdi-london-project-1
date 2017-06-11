function secureRoute(req, res, next) {
  if(!req.session.userId) {
    return req.session.regenerate(() => {
      req.flash('danger', 'you must be logged in!');
      res.redirect('/login');
    });
  }


  next();
}


module.exports = secureRoute;
