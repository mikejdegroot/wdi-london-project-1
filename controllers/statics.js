const User = require('../models/user');

function staticsIndex(req, res) {
  User                           //when index is called for by the router, find all users in the db
    .find()
    .exec()
    .then((users) => res.render('statics/index', { users })); //render the users on the statics index
}

function statics404(req, res) {
  User                           //when index is called for by the router, find all users in the db
    .find()
    .exec()
    .then(() => res.render('statics/404')); //render the users on the statics 404
}

module.exports = {
  index: staticsIndex,
  notFound: statics404
};
