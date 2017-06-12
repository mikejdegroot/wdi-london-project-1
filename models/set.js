const mongoose = require('mongoose');

const setSchema = new mongoose.Schema({
  name: {type: String, required: true},
  date: {type: Number, required: true},
  tracks: {type: String, required: true},
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true}
  //tells mongoose that the object id will be the user id
});

setSchema.methods.belongsTo = function belongsTo(user) {
  return this.createdBy.id === user.id;
};

module.exports = mongoose.model('Set', setSchema);
