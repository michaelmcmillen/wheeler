const genToken = require('./genToken.js');
const path = require('path');

//Handle user sign in, decrypting password, logging sign in occurances and creating new JWT within cookie
exports.signInHandler = (req, res, db, bcrypt) => {

    //Check if both Email and Password have been provided
    if(!req.body.email || !req.body.password) {
        return res.status(400).json(null);
    }
    
    //Validate password provided
    function validatePassword(hash) {
        return bcrypt.compareSync(req.body.password, hash);
    } 

    db('login')
    .where({
        email: req.body.email
    })
    .select('hash')
    .then(response => {
        if(validatePassword(response[0].hash)) {
            db('users')
            .where({
                email: req.body.email
            })
            .select('entries')
            .then(response => {
                let newEntries = response[0].entries;
                newEntries++;
                db('users')
                .where({
                    email: req.body.email
                })
                .returning('id')
                .update({
                    entries: newEntries
                })
                .then(response => {
                         //Generate a new JWT based on the Users ID
                        const accessToken = genToken.generateAccessToken({'userid': response[0]});
                        //Add token to cookie
                        res.cookie('token', accessToken, {
                        expires: new Date(Date.now() + 300000),
                        // secure: false, //Set to true if using HTTPS
                        httpOnly: true,
                        sameSite: 'strict'
                      })
                    .status(200).json(response);                    
                })
            })            
        }
        else {
            res.status(400).json(false);
        }
    })
    .catch(err => res.status(400).json('signInController Error:' + err));
}


