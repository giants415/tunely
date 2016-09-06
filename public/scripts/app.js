/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */


/* hard-coded data! */
// var sampleAlbums = [];
// sampleAlbums.push({
//              artistName: 'Ladyhawke',
//              name: 'Ladyhawke',
//              releaseDate: '2008, November 18',
//              genres: [ 'new wave', 'indie rock', 'synth pop' ]
//            });
// sampleAlbums.push({
//              artistName: 'The Knife',
//              name: 'Silent Shout',
//              releaseDate: '2006, February 17',
//              genres: [ 'synth pop', 'electronica', 'experimental' ]
//            });
// sampleAlbums.push({
//              artistName: 'Juno Reactor',
//              name: 'Shango',
//              releaseDate: '2000, October 9',
//              genres: [ 'electronic', 'goa trance', 'tribal house' ]
//            });
// sampleAlbums.push({
//              artistName: 'Philip Wesley',
//              name: 'Dark Night of the Soul',
//              releaseDate: '2008, September 12',
//              genres: [ 'piano' ]
//            });
/* end of hard-coded data */

var $albumsList;
var albumTemplate;
var allAlbums;

$(document).ready(function() {
  console.log('app.js loaded!');

  $albumsList = $('#album_target');

  var source = $('#album-template').html();
  albumTemplate = Handlebars.compile(source);

  // for (var index = 0; index < sampleAlbums.length; index++) {
  //   renderAlbum(sampleAlbums[index]);
  // }

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
    releaseDate: album.releaseDate
  });
  $albumsList.append(albumsHtml);
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
