//Set cookie expiry date to be in the past to disable token and logout
exports.logout = (req, res, next) => {
    res.cookie('token', '', {
        expires: new Date(Date.now() - 300000), //Set cookie to date passed which makes it invalid
        // secure: false, //Set this to true if you are using https
        httpOnly: true,
        sameSite: 'strict'
      })
      next();
}