var express = require('express');
var app = express();

app.use(express.static('public'));

var questions = require('./routes/questions');
app.use('/api/v1/questions', questions);

app.all('/*', function(request, response, next){
  response.header("Access-Control-Allow-Origin", "*");
  response.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
  response.header('Access-Control-Allow-Headers', 'Content-type', 'Accept');
  next();
});

app.get('/', function(done){
  response.status(200);
});

module.exports = app;