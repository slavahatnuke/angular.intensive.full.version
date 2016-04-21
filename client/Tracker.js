angular
    .module('Tracker', ['ui.router', 'ngResource', 'ui.select'])
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

        $urlRouterProvider.otherwise("/app/projects/list");

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
                templateUrl: "user/login.html",
                controller: 'LoginCtrl'
            })
            .state('app.signup', {
                url: "/signup",
                templateUrl: "user/signup.html",
                controller: 'SignUpCtrl'
            })
            .state('app.logout', {
                url: "/logout",
                controller: 'LogoutCtrl'
            })
            .state('app.projects', {
                url: "/projects",
                template: "<ui-view></ui-view><ui-view name='tasks'></ui-view>"
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
                views: {
                    '': {
                        templateUrl: "projects/project.html",
                        controller: 'ProjectCtrl'
                    },
                    'tasks@app.projects': {
                        templateUrl: "tasks/tasks.html",
                        controller: 'TasksCtrl'
                    }
                }

            })
        ;

        $httpProvider.interceptors.push(function ($q, $injector) {
            var publicUrls = ['/app/login', '/app/signup'];
            var isPublic = function () {
                return _.includes(publicUrls, $injector.get('$location').url())
            };

            return {
                'responseError': function (response) {
                    return $q(function (resolve, reject) {

                        if (response.status === 401 && !isPublic()) {
                            $injector.get('$state').go('app.login');
                        }

                        return reject(response);
                    });
                }
            };
        });
    })
    .config(function ($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    })
    .value('apiBaseUrl', 'http://docker:5100')
    .factory('resource', function ($resource, apiBaseUrl) {
        return function (url) {
            arguments[0] = apiBaseUrl + url;
            return $resource.apply($resource, arguments);
        };
    });