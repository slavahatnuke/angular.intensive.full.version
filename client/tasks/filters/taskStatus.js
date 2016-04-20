angular
  .module('Tracker')
  .filter('taskStatus', function (TaskService) {
    return function (status) {
      var status = TaskService.getStatusByValue(status);
      return status ? status.name : '';
    }
  });