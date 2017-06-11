const mongoose = require('mongoose');

const setSchema = new mongoose.Schema({
  name: {type: String, required: true},
  date: {type: Number, required: true},
  tracks: {type: String, required: true},
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User'}
  //tells mongoose that the object id will be the user id
});

setSchema.methods.belongsTo = function setBelongsTo(user) {
  if(typeof this.createdBy.id === 'string') return this.createdBy.id === user.id;
  return user.id === this.createdBy.toString();
};


module.exports = mongoose.model('Set', setSchema);
