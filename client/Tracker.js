angular
  .module('Tracker', ['ui.router', 'ngResource'])
  .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/app/login");

    $stateProvider
      .state('app', {
        resolve: {
          user: function (UserService, $q) {
            return $q(function (resolve) {
              UserService.load().then(resolve, function () {
                resolve();
              });
            })
          }
        },
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
      .state('app.projects', {
        url: "/projects",
        template: "<ui-view></ui-view>"
      })
      .state('app.projects.list', {
        url: "/list",
        templateUrl: "projects/projects.html",
        controller: 'ProjectsCtrl'
      })
      .state('app.projects.new', {
        url: "/new",
        templateUrl: "projects/projectsEdit.html",
        controller: 'ProjectsEditCtrl'
      })
      .state('app.projects.edit', {
        url: "/:projectId/edit",
        templateUrl: "projects/projectsEdit.html",
        controller: 'ProjectsEditCtrl'
      })
      .state('app.project', {
        parent: 'app.projects',
        url: "/:projectId",
        templateUrl: "projects/project.html",
        controller: 'ProjectCtrl'
      })
    ;
  })
;