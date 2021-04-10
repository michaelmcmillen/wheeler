const genToken = require('./genToken.js');
const path = require('path');


exports.signInHandler = (req, res, db, bcrypt) => {

    if(!req.body.email || !req.body.password) {
        return res.status(400).json(null);
    }
    
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
                         // Generate a new JWT based on the users ID
                        const accessToken = genToken.generateAccessToken({'userid': response[0]});
                        // Add token to cookie
                        res.cookie('token', accessToken, {
                        expires: new Date(Date.now() + 300000),
                        // secure: false, //set to true if your using https
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


