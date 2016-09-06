/************
 * DATABASE *
 ************/
var db = require('../models');

// GET /api/albums
function index(req, res) {
  // var albums = db.Album.find({});
  // res.json(albums);
  db.Album.find({}).exec(function(err, albums){
    if (err){
      res.send(err);
      return;
    }
    res.json(albums);
  })
}

function create(req, res) {
  // console.log(req);
  var newAlbum = new db.Album({
    name: req.body.name,
    artistName: req.body.artistName,
    releaseDate: req.body.releaseDate,
    genres: req.body.genres.split(', ')
  });
  // console.log(newAlbum);
  newAlbum.save(function(err, album){
    if (err){
      res.send(err);
      return;
    }
    res.json(album);
  })
}

function show(req, res) {
  // FILL ME IN !
}

function destroy(req, res) {
  // FILL ME IN !
}

function update(req, res) {
  // FILL ME IN !
}


// export public methods here
module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
