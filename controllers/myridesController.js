const path = require('path');

//Move to My Rides page
exports.myRides = (req, res, next) => {

  return res.sendFile(path.join(__dirname + '../../static-assets/myrides.html'));
      
}