const rp    = require('request-promise');
const api   = require('../config/api');
// const SpotifyWebApi = require('../');
let accessToken = null;
let originalDance = null;

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
    rp({
      url: 'https://api.spotify.com/v1/search',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      json: true,
      qs: {
        q: 'Beyonce 7/11',
        type: 'track',
        limit: 1
      }
    })
    .then((response) => { //stores the response in track and artist ID consts
      // console.log(response);
      const trackId = response.tracks.items[0].id;
      const artistId = response.tracks.items[0].artists[0].id;
      console.log(trackId);
      console.log(artistId);
      rp({ //requests the track info from id
        url: `https://api.spotify.com/v1/audio-features/${trackId}`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        json: true
      }).then((response) => { //stores the danceability of the song in a var
        originalDance = response.danceability;
        console.log(originalDance);
      }).then(() => {

        rp({ //uses the stored artist id to request related artists
          url: `https://api.spotify.com/v1/artists/${artistId}/related-artists`,
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`
          },
          json: true
        }).then((response) => {
          // console.log(response.artists.length); //20 artists are returned
          const numberGen = (Math.floor(Math.random()*20));
          const relatedArt = response.artists[numberGen].id;
          console.log(relatedArt);
        }).then((relatedArt)=> {
          // console.log(relatedArt);
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
          });
          res.json(response);

        });

      });


    });
    // res.json(token);
  });
}

// accessProxy();

module.exports = {
  proxy: accessProxy
};


/**
 * This example retrives an access token using the Client Credentials Flow. It's well documented here:
 * https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow
 */

/*
 * https://developer.spotify.com/spotify-web-api/using-scopes/
 */

 /**
 * Set the credentials given on Spotify's My Applications page.
 * https://developer.spotify.com/my-applications
//  */
// var spotifyApi = new SpotifyWebApi({
//   clientId: api.spotify.clientId,
//   clientSecret: api.spotify.clientSecret,
// });
//
// // Retrieve an access token
// spotifyApi.clientCredentialsGrant()
//   .then(function(data) {
//     console.log('The access token expires in ' + data.body['expires_in']);
//     console.log('The access token is ' + data.body['access_token']);
//
//     // Save the access token so that it's used in future calls
//     spotifyApi.setAccessToken(data.body['access_token']);
//   }, function(err) {
//     console.log('Something went wrong when retrieving an access token', err.message);
//   });
