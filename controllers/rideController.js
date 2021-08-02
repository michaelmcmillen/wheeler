const path = require('path');
require('dotenv').config()


exports.ride = (req, res, next) => {

  return res.sendFile(path.join(__dirname + '../../static-assets/createRide.html'));
      
}
