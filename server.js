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
const myrides = require('./controllers/myridesController.js');
const logout = require('./controllers/logoutController.js');
const ride = require('./controllers/rideController.js');
const registerPage = require('./controllers/registerPageController.js');
const selectRide = require('./controllers/selectRideController.js');
const deleteRide = require('./controllers/deleteRideController.js');
const { Console } = require('console');


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
    res.redirect('/myrides');
});

app.post('/signIn', (req, res) => {signIn.signInHandler(req, res, db, bcrypt)});

app.post('/register', (req, res) => {register.registerHandler(req, res, db, bcrypt) });

app.get('/registerPage', function (req, res) {registerPage.registerPage(req, res)});

// Run token auth on every request below
app.use(authenticate.authenticateToken);

app.get('/', (req, res) => { res.redirect('/myrides'); });


app.get('/myrides', function (req, res) {myrides.myRides(req, res)});

app.post('/createRide', function (req, res) {createRide.createRideHandler(req, res, db) });

app.get('/getRides', function (req, res) {getRides.getRides(req, res, db)});

app.get('/createRidePage', function (req, res) {ride.ride(req, res)});

app.get('/logout', (req, res, next) => {logout.logout(req, res, next)}, (req, res) => {
    res.redirect('/login');
});

app.get('/invalidateCookie', (req, res) => {invalidateCookie.invalidateCookie(req, res)});

app.post('/selectRide', function (req, res) {selectRide.selectRideHandler(req, res, db) });

app.delete('/deleteRide', function (req, res) {deleteRide.deleteRide(req, res, db)});
