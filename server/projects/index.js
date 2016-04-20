module.exports = function (app) {

  var _ = require('lodash');
  var form = app.container.get('form');
  var field = form.field;
  var Project = app.container.get('Project');

  var projectForm = form(
    field('name').trim().required(),
    field('description').trim(),
    field('share').array()
  );

  app.get('/api/projects', function (req, res, next) {
    Project
      .find({
        $or: [
          {author: req.user},
          {share: req.user}
        ]
      })
      .populate('author', '_id name')
      .populate('share', '_id name')
      .exec(function (err, projects) {
        if (err) {
          return next(err);
        }

        res.json(projects);
      })
  });

  app.post('/api/projects', projectForm, form.validateForm, function (req, res, next) {
    var project = new Project(req.form);
    project.author = req.user;

    project.save(function (err, project) {
      if (err) {
        return next(err);
      }

      res.json(project);

    })
  });

  app.param('projectId', function (req, res, next, id) {
    var query = {
      _id: id,
      $or: [
        {author: req.user},
        {share: req.user}
      ]
    };

    Project
      .findOne(query)
      .populate('author', '_id name')
      .populate('share', '_id name')
      .exec(function (err, project) {
      if (err) {
        return next(err);
      }

      if (!project) {
        return res.sendStatus(404);
      }

      req.Project = project;
      next();

    });
  });

  app.get('/api/projects/:projectId', function (req, res) {
    res.json(req.Project);
  });

  app.get('/api/projects/:projectId/users', function (req, res) {
    res.json(req.Project.share);
  });

  app.put('/api/projects/:projectId', projectForm, form.validateForm, function (req, res, next) {
    _.assign(req.Project, req.form);

    req.Project.save(function (err) {
      if (err) {
        return next(err);
      }

      res.json(req.Project);
    });

  });

  app.delete('/api/projects/:projectId', function (req, res, next) {
    req.Project.remove(function (err) {
      if (err) {
        return next(err);
      }

      res.sendStatus(200);
    });

  });

};