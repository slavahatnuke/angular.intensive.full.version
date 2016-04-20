angular
  .module('Tracker')
  .directive('taskEditor', function () {

    return {
      restrict: 'AE',
      scope: {
        'projectId': '=projectId',
        'onComplete': '=onComplete',
        'task': '=task'
      },
      templateUrl: '../tasks/taskEditor.html',
      controller: function ($scope, Task) {

        $scope.edit = function () {
          $scope.form = true;
        }

        $scope.add = function () {
          $scope.form = true;
          $scope.task = new Task;
        };

        $scope.close = function () {
          $scope.form = false;
        };

        $scope.save = function () {
          var promise = $scope.task._id ? $scope.task.$update() : $scope.task.$save({projectId: $scope.projectId});

          promise.then(function () {
            $scope.close();

            if ($scope.onComplete instanceof Function) {
              $scope.onComplete();
            }

          }, function (resp) {
            $scope.errors = resp.data;
          })
        };

      }
    };

  });