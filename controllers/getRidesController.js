exports.getRides = (req, res, db) => {
    db.from('users')
    .where({
            creator: req.user
        })
    .innerJoin(
        'rides',
        'rides.creator',
        'users.id',
    )
    .select('*')
    .then(response => {
        
        res.json(response)
        // console.log(response);
    })

}