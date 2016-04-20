module.exports = function (app) {
  var User = app.container.get('User');

  app.get('/api/users/me', function (req, res) {
    res.json(req.user);
  });

  app.get('/api/users', function (req, res, next) {
    User.find({}, '_id name', function (err, users) {
      if (err) {
        return next(err);
      }

      res.json(users);
    });
  })

};