//Move to Register page
const path = require('path');

exports.registerPage = (req, res, next) => {

  return res.sendFile(path.join(__dirname + '../../static-assets/register.html'));
      
}