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
                .update({
                    entries: newEntries
                })
                .then(response => {
                    res.status(200).json(true);
                })
                .catch(err => res.status(400).json(false));
            }) 
            .catch(err => res.status(400).json(false));           
        }
        else {
            res.status(400).json(false);
        }
    })
    .catch(err => res.status(400).json(false));
}