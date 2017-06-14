const spotify = {
  clientId: process.env.SPOTIFY_API_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_API_CLIENT_SECRET,
  clientbase: process.env.SPOTIFY_API_CLIENT_ENCODED,
  accessTokenUrl: 'https://accounts.spotify.com/api/token'
};

module.exports = {
  spotify
};
