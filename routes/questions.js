var express = require('express');

var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({ extended: false });

//BEGIN REDIS CONNECTION
var redis = require('redis');
var client = redis.createClient();

client.select((process.env.NODE_ENV || 'development').length);

var router = express.Router();
//END REDIS CONNECTION

router.route('/')

  .get(function(request, response){
    client.hkeys('questions', function(error, titles){
      if(error) throw error;
      response.json(titles);
    });
  })
  .post(urlencode, function(request, response){
    var newQuestion = request.body;
    if(!newQuestion.title || !newQuestion.content){
      response.sendStatus(400);
      return false;
    }
    var newQuestionInfo = JSON.stringify({'title': newQuestion.title, 'content': newQuestion.content});
    var key = Date.now()+(newQuestion.title.replace(/\W/g, ''));

    client.hset('questions', key, newQuestionInfo, function(error){
        if(error) throw error;
        response.status(201).json(key);
    });
  });

router.route('/:id')
  .get(function(request, response){
    client.hget('questions', request.params.id, function(error, info){
      var infoObj = JSON.parse(info);
      response.status(200).json(infoObj);
    });
  })
  .delete(function(request, response){
    client.hdel('questions', request.params.id, function(error){
      if(error) throw error;
      response.sendStatus(204);
    });
  });

module.exports = router;
