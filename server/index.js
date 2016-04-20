module.exports = function (app) {

  app.use(function (req, res, next) {
    if(req.session && req.session.user) {
      app.container.get('User').findById(req.session.user, '-password', function (err, user) {
        if (err) {
          return next(err);
        }

        if(!user) {
          delete req.session.user;
          return next();
        }

        req.user = user;
        next();
      })
    } else {
      next();
    }
  });

  var isAuthenticated = function (req, res, next) {
    if (!req.user) {
      return res.sendStatus(401);
    } else {
      next();
    }
  };

  app.use('/api/users', isAuthenticated);
  app.use('/api/projects', isAuthenticated);

  require('./auth')(app);
  require('./user')(app);
  require('./projects')(app);
  require('./tasks')(app);
};