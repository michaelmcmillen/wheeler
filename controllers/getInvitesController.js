//Retrieve logged in users created rides
exports.getInvites = (req, res, db) => {
  db.from('users')
  // .where({
  //         creator: req.user
  //     })
  // .innerJoin(
  //     'rides',
  //     'rides.creator',
  //     'users.id',
  // )
  .select('firstname','id')
  .then(response => {
      res.json(response)
  })
}