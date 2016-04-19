angular
  .module('Tracker')
  .controller('TrackerCtrl', function ($scope, UserService) {

    $scope.UserService = UserService;

    $scope.$watch('UserService.user', function (user) {
      $scope.user = user;
    })

  });