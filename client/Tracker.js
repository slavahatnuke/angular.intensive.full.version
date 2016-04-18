angular
  .module('Tracker', ['ui.router'])
  .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/app");

    $stateProvider
      .state('app', {
        url: "/app",
        templateUrl: "./Tracker.html"
      })
      .state('app.login', {
        url: "/login",
        templateUrl: "auth/login.html",
        controller: 'LoginCtrl'
      });
  });
;