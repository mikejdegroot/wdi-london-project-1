const facebook = {
  loginUrl: 'https://www.facebook.com/v2.9/dialog/oauth',
  clientId: process.env.FACEBOOK_APP_ID,
  redirectUrl: process.env.NODE_ENV === 'production' ? 'https://ancient-wave-67409.herokuapp.com/oauth/facebook' : 'http://localhost:8000/oauth/facebook',
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  scope: 'public_profile email',
  accessTokenUrl: 'https://graph.facebook.com/v2.9/oauth/access_token',
  getLoginUrl(){
    return `${this.loginUrl}?client_id=${this.clientId}&redirect_uri=${this.redirectUrl}&scope=${this.scope}`;
  }

};

module.exports = {
  facebook
};
