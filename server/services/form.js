module.exports = function () {
  var form = require('express-form');
  var field = form.field;

  form.validateForm = function (req, res, next) {
    if (!req.form.isValid) {
      return res.status(400).json(req.form.getErrors());
    }

    next();
  };

  return form;
}