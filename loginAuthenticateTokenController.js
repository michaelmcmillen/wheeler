// Use env variable for signing token
require('dotenv').config()
// Use jsonweb npm to create/verify JWT
const jwt = require('jsonwebtoken')
const path = require('path');

exports.loginAuthenticateToken = (req, res, next) => {
    
    // Check if cookie exists
    const token = req.cookies.token || '';

    try {
        if(!token) {
          // If there is no token, return login error
          // return res.status(401).json('You need to Login')
          // console.log(path);
          return res.sendFile(path.join(__dirname + '/static-assets/login.html'));
        }
        // Decrypt token if it exists
        const decrypt = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // Assign userid to req for next function
        req.user = decrypt.userid;
        // Move to next
        next();
        } 
    catch(err) {
            return res.status(500).json(err.toString());
        }

}
