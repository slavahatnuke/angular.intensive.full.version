module.exports = function (container) {
  container.register('mongoose', require('../services/mongoose'), ['config/mongo']);
  container.register('User', require('../user/userModel'), ['mongoose']);
  container.register('Project', require('../projects/projectModel'), ['mongoose']);
  container.register('Task', require('../tasks/taskModel'), ['mongoose']);

  container.register('form', require('../services/form'));

};