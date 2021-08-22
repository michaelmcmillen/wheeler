//Move to Create Ride page
const path = require('path');

exports.ride = (req, res, next) => {

  return res.sendFile(path.join(__dirname + '../../static-assets/createRide.html'));
      
}
