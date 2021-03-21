const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs'); // Password encryption
const cookieParser = require('cookie-parser'); // Parse and populate cookies

const app = express();
app.listen(3000); // Run Express on port 3000
console.debug('Server listening on port 3000');
app.use(cookieParser()); 
app.use(express.json());
app.use(cors({ origin: 'http://localhost:8080', credentials: true })); 
// app.use(express.static("./static-assets"));

const register = require('./controllers/registerController.js');
const signIn = require('./controllers/signInController.js');
const createRide = require('./controllers/createRideController.js');
const authenticate = require('./controllers/authenticateTokenController.js');
const invalidateCookie = require('./controllers/invalidateCookieController.js');
const getRides = require('./controllers/getRidesController.js');
const logout = require('./controllers/logoutController.js');

const db = require('knex')({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : 'postgresPass1',
        database : 'wheeler'
    }
});

app.post('/register', (req, res) => {register.registerHandler(req, res, db, bcrypt) });

app.post('/signIn', (req, res) => {signIn.signInHandler(req, res, db, bcrypt) });

app.post('/createRide', (req, res, next) => {authenticate.authenticateToken(req, res, next)}, (req, res) => {createRide.createRideHandler(req, res, db) });

app.get('/testJWT', (req, res, next) => {authenticate.authenticateToken(req, res, next)}, (req, res) => {
    res.json(req.user);
})

app.get('/invalidateCookie', (req, res) => {invalidateCookie.invalidateCookie(req, res)});

app.get('/logout', (req, res) => {logout.logout(req, res)});

app.get('/getRides', (req, res, next) => {authenticate.authenticateToken(req, res, next)}, (req, res) => {getRides.getRides(req, res, db)});