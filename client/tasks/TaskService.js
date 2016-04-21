angular
  .module('Tracker')
  .factory('Task', function (resource) {

    return resource('/api/projects/:projectId/tasks/:taskId', {projectId: '@project', taskId: '@_id'}, {
      update: {method: 'PUT'}
    });

  })
  .factory('TaskService', function () {
    var statuses = [
      {
        name: 'New',
        value: 'new',
        default: true
      },
      {
        name: 'In progress',
        value: 'in-progress'
      },
      {
        name: 'Done',
        value: 'done'
      }
    ];

    var self = {
      getStatuses: function () {
        return statuses;
      },
      getDefaultStatus: function () {
        return _.find(statuses, function (status) {
          return status.default;
        });
      },
      getStatusByValue: function (value) {
        return _.find(statuses, function (status) {
          return status.value === value;
        });
      }
    };

    return self;
  })
;