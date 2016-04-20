angular
  .module('Tracker')
  .controller('SignUpCtrl', function ($scope, $state, UserService) {

    $scope.user = {
      email: '',
      password: '',
      name: ''
    };

    $scope.signUp = function () {
      UserService.signUp($scope.user).then(function () {
        $state.go('app.projects.list')
      }, function (resp) {
        $scope.errors = resp.data;
      })
    }

  });