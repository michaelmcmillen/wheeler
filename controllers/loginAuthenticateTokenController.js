//Use .env value to verify token
require('dotenv').config()

//Use jsonweb NPM to verify JWT
const jwt = require('jsonwebtoken')
const path = require('path');

//Authenticate Login attempt
exports.loginAuthenticateToken = (req, res, next) => {
    
    const token = req.cookies.token || '';

    try {
        //Check if cookie exists
        if(!token) {
          //If there is no token, return Login page
          return res.sendFile(path.join(__dirname + '../../static-assets/index.html'));
        }
        //Decrypt token if it exists
        const decrypt = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        //Assign userid to req for next function
        req.user = decrypt.userid;
        //Move to next
        next();
        } 
    catch(err) {
            return res.status(500).json(err.toString());
        }

}
