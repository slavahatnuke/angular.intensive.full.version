angular
  .module('Tracker')
  .filter('userNames', function () {
    return function (users) {
      if (!users) {
        return '';
      }

      return _.map(users, function (user) {
        return user.name
      }).join(', ');
    }
  });