var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/client'));

var application = require('plus.application');

new application({
  dir: __dirname + '/server/config',
  env: process.env.NODE_ENV || 'dev'
}).wrap(app);

app.set('trust proxy', 1);
app.use(session({
  secret: 'tracker$$app$',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: app.container.get('mongoose').connection })
}));

require('./server')(app);

console.log(app.config.get('mongo'))

app.listen(3000, function () {
  console.log('app started on port: ', 3000);
});