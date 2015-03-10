var express = require('express');

var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({ extended: false });

var router = express.Router();

var questions = {
  1: {
    'title': 'What is hoisting?',
    'content': 'Explain hoisting in JavaScript.',
    'language': 'JAVASCRIPT'
  },
  2: {
    'title': 'Ruby Blocks',
    'content': 'What is a proc in Ruby and what is a block?',
    'language': 'RUBY'
  }
}

router.route('/')
  .get(function(request, response){
    response.status(200).json(questions);
  })
  .post(urlencode, function(request, response){
    var newQuestion = request.body;
    if(!newQuestion.title || !newQuestion.content){
      response.sendStatus(400);
      return false;
    }
    questions[questions.length] = {'title': newQuestion.title, 'content': newQuestion.content};
    response.status(201).json(newQuestion.title);
  });

module.exports = router;
