module.exports = function (app) {

  var _ = require('lodash');
  var form = app.container.get('form');
  var field = form.field;
  var Project = app.container.get('Project');

  var projectForm = form(
    field('name').trim().required(),
    field('description').trim()
  );

  app.get('/api/projects', function (req, res, next) {
    Project.find({}, function (err, projects) {
      if (err) {
        return next(err);
      }

      res.json(projects);
    })
  });

  app.post('/api/projects', projectForm, form.validateForm, function (req, res, next) {
    new Project(req.form).save(function (err, project) {
      if (err) {
        return next(err);
      }

      res.json(project);

    })
  });

  app.param('projectId', function (req, res, next, id) {
    Project.findById(id, function (err, project) {
      if (err) {
        return next(err);
      }

      if (!project) {
        return res.sendStatus(404);
      }

      req.Project = project;
      next();

    })
  });

  app.get('/api/projects/:projectId', function (req, res) {
    res.json(req.Project);
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