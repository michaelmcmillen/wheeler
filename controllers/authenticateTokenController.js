//Access .env values for signing/verifying token
require('dotenv').config()

//Use jsonweb NPM to create/verify JWT
const jwt = require('jsonwebtoken')
const path = require('path');

exports.authenticateToken = (req, res, next) => {
    
    //Check if cookie exists
    const token = req.cookies.token || '';
    try {
        if(!token) {
          //If there is no token, return the Login page
          return res.redirect('/login');
        }
        //Decrypt JWT if it exists
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
