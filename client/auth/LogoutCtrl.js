angular
  .module('Tracker')
  .controller('LogoutCtrl', function ($state, UserService) {

    UserService.logout().then(function () {
      $state.go('app.login')
    });

  });