angular
  .module('Tracker')
  .factory('Project', function ($resource) {

    return $resource('/api/projects/:projectId', {projectId: '@_id'}, {
      update: {method: 'PUT'}
    });

  })
;