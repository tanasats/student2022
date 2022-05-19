module.exports = {
  secret: "myapp-secret-key",
  jwtExpiration: 3600,           // 1 hour
  // jwtExpiration: 60,          // 1 minute
  jwtRefreshExpiration: 86400,   // 24 hours

  appSecret:"tanasat-secret-key" // auth api secret key for this app
  /* for test */
  // jwtExpiration: 60,          // 1 minute
  // jwtRefreshExpiration: 120,  // 2 minutes
};