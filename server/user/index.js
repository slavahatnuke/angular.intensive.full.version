module.exports = function (app) {
  
  app.get('/api/users/me', function (req, res) {
    res.json(req.user);
  })
  
};