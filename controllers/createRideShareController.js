//Create new ride:user share in bridging table
exports.createRideShareHandler = (req, res, db) => {
    db('rideshare')
    .returning('userid', 'rideid')
    .insert({
        userid: req.body.userId,
        rideid: req.body.rideId
    })
    .then(response => {
        // console.log(response);
        res.status(200).json(response);
    })
    .catch(err => res.status(400).json('createRideController Error:' + err));

    
}