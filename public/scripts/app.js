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

  // $albumsList = $('#album-template');

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

  $('#albums').on('click', '.add-song', function handleNewSongClick(e) {
    console.log('add-song clicked!');
    var id= $(this).closest('.album').data('album-id');
    console.log('id',id);
    $('#songModal').data('album-id', id);
    $('#songModal').modal('toggle');
  });

  $('#saveSong').on('click', function handleNewSongSubmit(e){
    e.preventDefault();
    console.log("song save button clicked");
    console.log($('#songName').val() , $('#trackNumber').val());
    var newModalSong = $('#songName').val();
    var newModalNum = $('#trackNumber').val();
    // ajax
    // on succes
  })

});




// this function takes a single album and renders it to the page
function renderAlbum(album) {
  console.log('rendering album:', album);
  var albumsHtml = albumTemplate(album);
  $('#albums').append(albumsHtml);
}

function handleSuccess () {
  console.log('new album created');
  allAlbums = dataAlbum;
  renderAlbum(allAlbums);
}

function getAllSuccess (json){
  $('#albums').empty();
  allAlbums = json;
  allAlbums.forEach(function (album){
    renderAlbum(album);
  });
}

function getAllError () {
  console.log('error with get all');
}
