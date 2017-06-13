function customResponses(req, res, next) {

  res.notFound = function notFound() {
    const err = new Error('notFound');
    err.status = 404;
    throw err;
  };

  res.badRequest = function (url, error) {
    req.flash('danger', error);
    return res.redirect(url);
  };

  res.unauthorized = function unauthorized(url='/login', message='You must be logged in!') {
    req.flash('danger', message);
    return res.redirect(url);
  };
  next();
}

module.exports = customResponses;
