exports.selectRideHandler = (req, res, db) => {
    db.from('rides')
    .where({
            id: req.body.id
        })
    // .innerJoin(
    //     'rides',
    //     'rides.creator',
    //     'users.id',
    // )
    .select('*')
    .then(response => {
        
        res.json(response)
    })

}