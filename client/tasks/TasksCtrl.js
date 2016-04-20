angular
  .module('Tracker')
  .controller('TasksCtrl', function ($scope, $state, Task) {

    $scope.projectId = $state.params.projectId;

    $scope.init = function () {
      $scope.tasks = Task.query({projectId: $scope.projectId});
    };

    $scope.init();

    $scope.remove = function (task) {
      task.$remove().then($scope.init);
    }

  });