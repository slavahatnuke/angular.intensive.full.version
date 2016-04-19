angular
  .module('Tracker')
  .controller('LoginCtrl', function ($scope, $state, UserService) {

    $scope.user = {
      email: '',
      password: ''
    };

    $scope.login = function () {
      UserService.login($scope.user).then(function () {
        $state.go('app.projects')
      }, function (resp) {
        $scope.errors = resp.data;
      })
    }

  });