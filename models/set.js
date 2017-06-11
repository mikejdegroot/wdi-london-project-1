const mongoose = require('mongoose');

const setSchema = new mongoose.Schema({
  name: {type: String, required: true},
  tracks: {type: String, required: true}
});

module.exports = mongoose.model('Set', setSchema);
