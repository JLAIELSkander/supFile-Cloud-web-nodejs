var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;


var routes = require('./routes');
var bodyParser = require('body-parser');


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,encrypt');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());



routes(app);


app.listen(port),console.log('RESTful API server started on: ' + port);
