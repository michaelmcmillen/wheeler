exports.logout = (req, res) => {
    res.cookie('token', '', {
        expires: new Date(Date.now() - 300000), // Set cookie to date passed so invalid
        // secure: false, //set to true if your using https
        httpOnly: true,
        sameSite: 'strict'
      })
      .status(200).json("Access: rubbish");
      next();
}