angular
  .module('Tracker')
  .factory('Task', function ($resource) {

    return $resource('/api/projects/:projectId/tasks/:taskId', {projectId: '@project', taskId: '@_id'}, {
      update: {method: 'PUT'}
    });

  })
;