var express = require('express');
var app = express();

app.use(express.static('public'));

var questions = require('./routes/questions');
app.use('/questions', questions);

app.get('/', function(done){
  response.status(200);
});

module.exports = app;