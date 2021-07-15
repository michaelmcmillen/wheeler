// Backend framework for node.js
const express = require('express');
// Middleware package to allow Cross Origin Requests
const cors = require('cors');
// Encryption for user data
const bcrypt = require('bcryptjs'); // Password encryption
const cookieParser = require('cookie-parser'); // Parse and populate cookies

const app = express();
// Allows string to be created with path to current file
const path = require('path');
app.listen(3000); // Run Express on port 3000
console.debug('Server listening on port 3000');
app.use(cookieParser()); 
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true })); 
app.use(express.static("./static-assets"));

const register = require('./controllers/registerController.js');
const signIn = require('./controllers/signInController.js');
const createRide = require('./controllers/createRideController.js');
const authenticate = require('./controllers/authenticateTokenController.js');
const loginAuthenticate = require('./controllers/loginAuthenticateTokenController.js');
const invalidateCookie = require('./controllers/invalidateCookieController.js');
const getRides = require('./controllers/getRidesController.js');
const dashboard = require('./controllers/dashboardController.js');
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

app.get('/login', (req, res, next) => {loginAuthenticate.loginAuthenticateToken(req, res, next)}, (req, res) => {
    res.redirect('/dashboard');
});

app.post('/signIn', (req, res) => {signIn.signInHandler(req, res, db, bcrypt)});

app.post('/register', (req, res) => {register.registerHandler(req, res, db, bcrypt) });

// Run token auth on every request below
app.use(authenticate.authenticateToken);

app.get('/', function (req, res) {
    res.redirect('/dashboard');
});

app.get('/dashboard', function (req, res) {dashboard.dashboard(req, res)});

app.post('/createRide', function (req, res) {createRide.createRideHandler(req, res, db) });

app.get('/getRides', function (req, res) {getRides.getRides(req, res, db)});

app.get('/logout', (req, res, next) => {logout.logout(req, res, next)}, (req, res) => {
    res.redirect('/login');
});

app.get('/invalidateCookie', (req, res) => {invalidateCookie.invalidateCookie(req, res)});
