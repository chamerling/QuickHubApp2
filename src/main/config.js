module.exports = {
  sources: {
    repoUrl: 'https://github.com/chamerling/quickhubapp2'
  },
  oauth: {
    clientId: process.env.GITHUB_CLIENT_ID || '9620dd52982ce6179ace',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    authorizationUrl: 'http://github.com/login/oauth/authorize',
    tokenUrl: 'https://github.com/login/oauth/access_token',
    useBasicAuthorizationHeader: false,
    // don't touch me
    redirectUri: 'http://localhost'
  }
};
