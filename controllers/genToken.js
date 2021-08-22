//Use .env value for signing token
require('dotenv').config()

//Use jsonweb NPM to create/verify JWT
const jwt = require('jsonwebtoken')

//Generate JWT which expires in 10mins
exports.generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 600000 })
}