const rp    = require('request-promise');
const api   = require('../config/api');
let trackId = null;
let artistId = null;
let numberGen = null;
let relatedArt = null;
let trackOne = null;
let trackTwo = null;
let trackThree = null;
let trackFour = null;
let trackFive = null;

let accessToken     = null;
let originalDance   = null;
let matched         = null;

function accessProxy(req, res) { //function requests the token from spotify
  rp({
    url: api.spotify.accessTokenUrl,
    method: 'POST',
    headers: {
      'Authorization': `Basic ${api.spotify.clientbase}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    json: true,
    form: {
      grant_type: 'client_credentials'
    }
  })
  .then((token) => { //uses the token to request a query search for song
    accessToken = token.access_token;
    return rp({
      url: 'https://api.spotify.com/v1/search',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      json: true,
      qs: {
        q: `${req.query.keywords}`, ///change this to be the output of the add track form on the show page
        type: 'track',
        limit: 1
      }
    });
  })
  .then((response) => { //stores the response in track and artist ID consts
    // console.log(response);
    trackId = response.tracks.items[0].id;
    artistId = response.tracks.items[0].artists[0].id;
    audioInfo();
  });


  function audioInfo() {
    rp({ //requests the track info from id
      url: `https://api.spotify.com/v1/audio-features/${trackId}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      json: true
    }).then((response) => { //stores the danceability of the song in a var
      originalDance = response.danceability;
      // console.log(originalDance);
    }).then(() => {
      relatedArtists();
    });
  }

  function relatedArtists() {
    rp({ //uses the stored artist id to request related artists
      url: `https://api.spotify.com/v1/artists/${artistId}/related-artists`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      json: true
    }).then((response) => { // chooses one of the related artists randomly and returns their top tracks
      // console.log(response.artists.length); //20 artists are returned
      numberGen = (Math.floor(Math.random()*20));
      relatedArt = response.artists[numberGen].id;
      // console.log(response.artists[numberGen].name);
      topTracks();
    });
  }

  function topTracks() {
    rp({
      url: `https://api.spotify.com/v1/artists/${relatedArt}/top-tracks`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      json: true,
      qs: {
        'country': 'GB'
      }
    }).then((response) => { // picks the top 5 tracks out
      trackOne    = response.tracks[0].id;
      trackTwo    = response.tracks[1].id;
      trackThree  = response.tracks[2].id;
      trackFour   = response.tracks[3].id;
      trackFive   = response.tracks[4].id;
      // console.log(trackOne + trackTwo + trackThree + trackFour + trackFive);
      audioFeatures();
    });
  }

  function audioFeatures(){
    rp({ // searches for the audio features of those top 5 tracks
      url: `https://api.spotify.com/v1/audio-features/?ids=${trackOne},${trackTwo},${trackThree},${trackFour},${trackFive}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      json: true
    }).then((response) => { // cycle through the retuned arr and push up the dncblty attribute to new arr
      const danceArray = [];

      for(let i = 0; i < response.audio_features.length; i++) {
        // console.log(response.audio_features[i].danceability);
        danceArray.push(response.audio_features[i].danceability);
      }

      const x = originalDance; //compare the value of each number to orig trk and store closest in var
      const closest = danceArray.sort( (a, b) => Math.abs(x - a) - Math.abs(x - b) )[0];
      // console.log(originalDance);
      // console.log(closest);

      //cycle through the top tracks array and pull out the one with the danceability of the above value,

      for(let i = 0; i < response.audio_features.length; i++) {
        if(response.audio_features[i].danceability === closest) {
          matched = response.audio_features[i].id;
        }
      }
    }).then(() => {
      finalTrack();
    });
  }

  function finalTrack() {  //connect to spoty one more time to return the details of the selected track using the id.
    rp({
      url: `https://api.spotify.com/v1/tracks/${matched}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      json: true
    })
    .then((response) => {
      const newArtist = response.artists[0].name; //store the output in variables
      const newTrack  = response.name;
      res.json({ newArtist, newTrack });
      // console.log(response);
    });

  }
}


module.exports = {
  proxy: accessProxy
};
