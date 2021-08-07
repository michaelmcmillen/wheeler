exports.deleteRide = (req, res, db) => {

    db('rides')
    .where('id', req.body.id)
    .del()
    .then(response => {
        console.log(response);
        res.status(200).json("Ride Deleted Successfully");
    })
    // .catch(err => res.status(400).json('createRideController Error:' + err));

}