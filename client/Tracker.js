angular
  .module('Tracker', ['ui.router', 'ngResource'])
  .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/app/login");

    $stateProvider
      .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "./Tracker.html",
        controller: 'TrackerCtrl'
      })
      .state('app.login', {
        url: "/login",
        templateUrl: "auth/login.html",
        controller: 'LoginCtrl'
      })
      .state('app.signup', {
        url: "/signup",
        templateUrl: "auth/signup.html",
        controller: 'SignUpCtrl'
      })
      .state('app.logout', {
        url: "/logout",
        controller: 'LogoutCtrl'
      })
    ;
  })
;