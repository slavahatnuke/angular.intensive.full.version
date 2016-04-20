angular
  .module('Tracker')
  .controller('TasksCtrl', function ($scope, $state, Task) {

    $scope.projectId = $state.params.projectId;

    $scope.init = function () {
      $scope.tasks = Task.query({projectId: $scope.projectId});
    };

    $scope.init();

    $scope.view = 'board';
    $scope.useView = function (view) {
      $scope.view = view;
    }

  });