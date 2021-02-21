
exports.registerHandler = (req, res, db, bcrypt) => {
    
    function encryptPassword(pass) {
        return bcrypt.hashSync(pass, 10);
    } 
    
    let hash = encryptPassword(req.body.password);

    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: req.body.email
        })
        .into('login')
        .returning('email')
        .then(response => {
            return trx('users')
                    .insert({
                    email: response[0],
                    name: req.body.name,
                    surname: req.body.surname,
                    joined: req.body.joined
                })
                .then(response => {
                    res.status(200).json('User Registered');
                }) 
            })   
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => {
        return res.status(400).json(err.detail)
    })
   
}
