var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Song = require('./song.js');

var albumSchema = new Schema({
  name: String,
  artistName: String,
  releaseDate: String,
  genres: Array,
  song: [Song.schema]
});

var Album = mongoose.model('Album', albumSchema);
module.exports = Album;
