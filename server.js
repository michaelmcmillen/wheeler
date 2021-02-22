const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const app = express();
// const path = require('path');
app.use(express.json());
app.use(cors()); 
app.use(express.static("./static-assets"));
const register = require('./controllers/registerController.js');
const signIn = require('./controllers/signInController.js');

app.listen(3000);
console.debug('Server listening on port 3000');

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


// //Serve up webpage from server
// app.get('/', function(req,res){
//     res.sendFile(path.join(__dirname+'/index.html')); //__dirname resolves to project folder
// });
