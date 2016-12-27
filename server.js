var server;
var app;
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var path = require('path');
var host = process.env.HOST || '0.0.0.0';
var port = process.env.PORT || 2204;
var root = path.resolve(__dirname);

app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var routes = require('./server/routes/routes.js')(app);

app.use(function (req, res, next) {
  console.log(req.url);
  next();
});

app.use(express.static(root + '/dist', {
  maxAge: '365 days',
  setHeaders: function (res, path) {
    if (path.indexOf('service-worker.js') != -1) {
      res.setHeader('Cache-Control', 'public, max-age=0');
    }
  },
}));

app.use(favicon(__dirname + '/images/favicon.png'));
app.use('/data', express.static('data'));
server = app.listen(port, serverStarted);

function serverStarted() {
  console.log('Server started', host, port);
  console.log('Root directory', root);
  console.log('Press Ctrl+C to exit...\n');
};
