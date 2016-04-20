angular
  .module('Tracker')
  .controller('ProjectCtrl', function ($scope, $state, Project) {

    $scope.project = Project.get({projectId: $state.params.projectId});

  });