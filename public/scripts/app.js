/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */


var $albumsList;
var albumTemplate;
var allAlbums;
var dataAlbum;


$(document).ready(function() {
  console.log('app.js loaded!');

  $albumsList = $('#album_target');

  var source = $('#album-template').html();
  albumTemplate = Handlebars.compile(source);

  $('#newAlbumForm').on('submit', function(event){
    event.preventDefault();
    var dataAlbum = $(this).serialize();
    console.log(dataAlbum);
    $.ajax({
      method: 'POST',
      data: dataAlbum, //$('#newAlbumForm').serialize(),
      url:'/api/albums',
      dataType: 'json',
      success: handleSuccess,
      error: getAllError
    })
    $(this).trigger("reset");
  })

  $.ajax({
    method: 'GET',
    url: '/api/albums',
    success: getAllSuccess,
    error: getAllError
  })


});




// this function takes a single album and renders it to the page
function renderAlbum(album) {
  console.log('rendering album:', album);
  var albumsHtml = albumTemplate({
    name: album.name,
    artistName: album.artistName,
    releaseDate: album.releaseDate,
    genres: album.genres
  });
  $albumsList.append(albumsHtml);
}

function handleSuccess () {
  console.log('new album created');
  allAlbums = dataAlbum;
  renderAlbum([allAlbums]);
}

function getAllSuccess (json){
  $albumsList.empty();
  allAlbums = json;
  allAlbums.forEach(function (album){
    renderAlbum(album);
  });
}

function getAllError () {
  console.log('error with get all');
}
