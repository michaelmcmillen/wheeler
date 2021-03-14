// Use env variable for signing token
require('dotenv').config()
// Use jsonweb npm to create/verify JWT
const jwt = require('jsonwebtoken')

// Signing for JWT
exports.generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 600000 })
}