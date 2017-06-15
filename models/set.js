const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true}
}, {
  timestamps: true
});

trackSchema.methods.belongsTo = function trackBelongsTo(user) {
  if(typeof this.createdBy.id === 'string') return this.createdBy.id === user.id;
  return user.id === this.createdBy.toString();
};

const setSchema = new mongoose.Schema({
  name: {type: String, required: true},
  date: {type: String, required: true, match: /[0-9]{2}\/[0-9]{2}\/[0-9]{4}/},
  tracks: [trackSchema],
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true}
  //tells mongoose that the object id will be the user id
});

setSchema.methods.belongsTo = function setBelongsTo(user) {
  if(typeof this.createdBy.id === 'string') return this.createdBy.id === user.id;
  return user.id === this.createdBy.toString();
};

setSchema.virtual('lastTrack')
  .get(function getLastTrack() {
    return this.tracks.splice(-1)[0];
  });

module.exports = mongoose.model('Set', setSchema);
