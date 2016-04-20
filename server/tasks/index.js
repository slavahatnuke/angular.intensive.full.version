module.exports = function (app) {

  var _ = require('lodash');
  var form = app.container.get('form');
  var field = form.field;
  var Task = app.container.get('Task');

  var taskForm = form(
    field('name').trim().required(),
    field('assigned').trim().required(),
    field('description').trim()
  );

  app.get('/api/projects/:projectId/tasks', function (req, res, next) {
    Task.find({project: req.Project})
      .populate('author', '_id name')
      .populate('assigned', '_id name')
      .exec(function (err, tasks) {
        if (err) {
          return next(err);
        }

        res.json(tasks);
      });
  });

  app.post('/api/projects/:projectId/tasks', taskForm, form.validateForm, function (req, res, next) {
    var task = new Task(req.form);

    task.project = req.Project;
    task.author = req.user;

    task.save(function (err) {
      if (err) {
        return next(err);
      }

      res.json(task);
    })

  });

  app.param('taskId', function (req, res, next, id) {
    var query = {
      _id: id,
      project: req.Project
    };

    Task.findOne(query, function (err, task) {
      if (err) {
        return next(err);
      }

      if (!task) {
        return res.sendStatus(404);
      }

      req.Task = task;
      next();

    })
  });

  app.put('/api/projects/:projectId/tasks/:taskId', taskForm, form.validateForm, function (req, res, next) {

    _.assign(req.Task, req.form);

    req.Task.save(function (err) {
      if (err) {
        return next(err);
      }

      res.json(req.Task);
    })

  });

  app.delete('/api/projects/:projectId/tasks/:taskId', function (req, res, next) {

    req.Task.remove(function (err) {
      if (err) {
        return next(err);
      }

      res.sendStatus(200);
    })

  });

};