module.exports = function (app) {

  var form = require('express-form');
  var field = form.field;
  var User = app.container.get('User');

  var loginForm = form(
    field('email').trim().isEmail().required(),
    field('password').trim().required()
  );

  var signupForm = form(
    field('password').trim().required(),
    field('email').trim().isEmail().required().custom(function (value, form, next) {
      User.count({email: value}, function (err, result) {
        if (err) {
          return next(err);
        }

        if (result) {
          return next(new Error('Email is already exists'));
        }

        next();
      })
    }),
    field('name').trim().required().custom(function (value, form, next) {
      User.count({name: value}, function (err, result) {
        if (err) {
          return next(err);
        }

        if (result) {
          return next(new Error('Name is already exists'));
        }

        next();
      })
    })
  );

  var validateForm = function (req, res, next) {
    if (!req.form.isValid) {
      return res.status(400).json(req.form.getErrors());
    }

    next();
  };

  app.post('/api/auth/login', loginForm, validateForm, function (req, res, next) {

    User.findOne({email: req.form.email}, function (err, user) {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.status(403).json({email: 'User was not found'});
      }

      if (!user.verifyPassword(req.form.password)) {
        return res.status(403).json({password: 'Wrong password'});
      }

      req.session.user = user._id;

      res.json(user);
    });

  });

  app.post('/api/auth/logout', function (req, res, next) {
    req.session.destroy(function(err) {
      if (err) {
        return next(err);
      }

      res.sendStatus(200);
    })
  });

  app.post('/api/auth/signup', signupForm, validateForm, function (req, res, next) {
    new User(req.form).save(function (err, user) {
      if (err) {
        return next(err);
      }

      req.session.user = user._id;

      res.json(user);
    })
  });

};