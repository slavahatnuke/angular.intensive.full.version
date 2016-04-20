angular
  .module('Tracker')
  .directive('taskItem', function () {
    return {
      restrict: 'AE',
      scope: {
        'task': '=task',
        'onTaskUpdate': '=onTaskUpdate'
      },
      templateUrl: 'tasks/directives/taskItem.html',
      controller: function ($scope) {
        $scope.remove = function (task) {
          task.$remove().then(function () {
            $scope.onTaskUpdate instanceof Function && $scope.onTaskUpdate();
          });
        };
      }
    };

  });