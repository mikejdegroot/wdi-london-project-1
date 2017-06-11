const mongoose = require('mongoose');

const setSchema = new mongoose.Schema({
  name: {type: String, required: true},
  date: {type: Number, required: true},
  tracks: {type: String, required: true}
});

module.exports = mongoose.model('Set', setSchema);
