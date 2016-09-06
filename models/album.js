var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var albumSchema = new Schema({
  name: String,
  artistName: String,
  releaseDate: String,
  genres: Array
});

var Album = mongoose.model('Album', albumSchema);
module.exports = Album;
