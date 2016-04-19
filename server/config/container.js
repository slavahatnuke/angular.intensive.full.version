module.exports = function (container) {
  container.register('mongoose', require('../services/mongoose'), ['config/mongo']);
  container.register('User', require('../user/userModel'), ['mongoose']);

};