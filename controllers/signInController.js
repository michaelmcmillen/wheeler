
exports.signInHandler = (req, res, db, bcrypt) => {
    
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
            res.status(200).json('true');
        }
        else {
            res.status(400).json('false');
        }
    })
    .catch(err => res.status(400).json("Unable To Get User: " + err));