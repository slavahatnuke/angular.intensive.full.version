angular
  .module('Tracker')
  .factory('UserService', function () {
    return {
      login: function (user) {
        //...
      }
    }
  })
  .controller('LoginCtrl', function ($scope, $state, UserService) {

    $scope.login = function () {
      UserService.login($scope.user).then(function () {
        $state.go('app.projects')
      })
    }

  });