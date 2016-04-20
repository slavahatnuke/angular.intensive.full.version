angular
  .module('Tracker')
  .filter('tasksByStatus', function () {
    return function (tasks, status) {
      return _.filter(tasks || [], function (task) {
        return task.status === status;
      });
    }
  });