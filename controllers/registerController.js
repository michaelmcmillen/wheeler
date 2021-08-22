const genToken = require('./genToken.js');

//Register new user
exports.registerHandler = (req, res, db, bcrypt) => {
    
    //Create hash of user password
    function encryptPassword(pass) {
        return bcrypt.hashSync(pass, 10);
    } 
    
    let hash = encryptPassword(req.body.password);

    //Populate DB with user details
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: req.body.email
        })
        .into('login')
        .returning('email')
        .then(response => {
            return trx('users')
                    .returning('id')
                    .insert({
                    email: response[0],
                    firstname: req.body.name,
                    surname: req.body.surname,
                    joined: req.body.joined
                })
                .then(response => {
                     //Generate a new JWT based on the Users ID
                     const accessToken = genToken.generateAccessToken({'userid': response[0]});
                     //Add JWT to cookie
                     res.cookie('token', accessToken, {
                     expires: new Date(Date.now() + 300000),
                     // secure: false, //Set to true if using HTTPS
                     httpOnly: true,
                     sameSite: 'strict'
                     })
                     .status(200).json(accessToken);
                }) 
            })   
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => {
        return res.status(400).json(err.detail)
    })
   
}
