//Create new ride
exports.createRideHandler = (req, res, db) => {
    db('rides')
    .returning('id')
    .insert({
        name: req.body.name,
        date: req.body.date,
        time: req.body.time,
        meetpoint: req.body.meetingPoint,
        finishpoint: req.body.finishPoint,
        leader: req.body.leader,
        groupsize: req.body.participants,
        notes: req.body.notes,
        ridelink: req.body.rideLink,
        creator: req.user,
        created: new Date()
    })
    .then(response => {
        // console.log(response);
        res.status(200).json(response);
    })
    .catch(err => res.status(400).json('createRideController Error:' + err));

    
}