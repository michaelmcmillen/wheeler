// Use env variable for signing token
require('dotenv').config()
// Use jsonweb npm to create/verify JWT
const jwt = require('jsonwebtoken')
const path = require('path');

exports.myRides = (req, res, next) => {

  return res.sendFile(path.join(__dirname + '../../static-assets/myrides.html'));
      
}