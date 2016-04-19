angular
  .module('Tracker')
  .controller('ProjectsCtrl', function ($scope, Project) {

    function init() {
      $scope.projects = Project.query();
    }

    init();

    $scope.remove = function (project) {
      project.$remove().then(init);
    }

  });