angular
  .module('Tracker')
  .directive('taskEditor', function () {

    return {
      restrict: 'AE',
      scope: {
        'onComplete': '=onComplete',
        'projectId': '=?projectId',
        'task': '=?task'
      },
      templateUrl: '../tasks/taskEditor.html',
      controller: function ($scope, Task, ProjectUser) {

        function getProjectId() {
          if ($scope.task) {
            return $scope.task.project;
          }

          return $scope.projectId;
        }

        $scope.loadForm = function () {
          $scope.form = true;
          $scope.users = ProjectUser.query({projectId: getProjectId()});
        };

        $scope.edit = function () {
          $scope.loadForm();

          if ($scope.task.assigned && $scope.task.assigned._id) {
            $scope.task.assigned = $scope.task.assigned._id;
          }
        };

        $scope.add = function () {
          $scope.loadForm();
          $scope.task = new Task;
        };

        $scope.close = function () {
          $scope.form = false;
          $scope.task = null;

          if ($scope.onComplete instanceof Function) {
            $scope.onComplete();
          }
        };

        $scope.save = function () {
          var promise = $scope.task._id ? $scope.task.$update() : $scope.task.$save({projectId: $scope.projectId});

          promise.then(function () {
            $scope.close();
          }, function (resp) {
            $scope.errors = resp.data;
          })
        };

      }
    };

  });