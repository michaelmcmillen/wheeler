// Use env variable for signing token
require('dotenv').config()
// Use jsonweb npm to create/verify JWT
const jwt = require('jsonwebtoken')
const path = require('path');

exports.dashboard = (req, res, next) => {

  return res.sendFile(path.join(__dirname + '../../static-assets/dashboard.html'));
      
}