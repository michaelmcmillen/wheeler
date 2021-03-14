exports.getRides = (req, res, db) => {
    db.from('rides')
    .where({
            creator: req.user
        })
    .innerJoin(
        'users',
        'rides.creator',
        'users.id'
    )
    .select('*')
    .then(response => {
        res.json(response)
    })

}