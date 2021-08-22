//Select a ride from list of My Rides and return all values
exports.selectRideHandler = (req, res, db) => {
    db.from('rides')
    .where({
            id: req.body.id
        })
    .select('*')
    .then(response => {
        res.json(response)
    })

}