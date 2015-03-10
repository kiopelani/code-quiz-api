var express = require('express');
var app = express();

app.use(express.static('public'));

var cors = require('cors');

app.use(cors());
app.options('*', cors());

var questions = require('./routes/questions');
app.use('/api/v1/questions', questions);


app.get('/', function(done){
  response.status(200);
});

module.exports = app;