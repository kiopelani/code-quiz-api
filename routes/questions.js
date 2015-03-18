var express = require('express');

var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({ extended: false });

//BEGIN REDIS CONNECTION
var redis = require('redis');
if(process.env.REDISTOGO_URL){
  var rtg = require("url").parse(process.env.REDISTOGO_URL);
  var client = redis.createClient(rtg.port, rtg.hostname);
  client.auth(rtg.auth.split(":")[1]);
} else {
  var client = redis.createClient();
  client.select((process.env.NODE_ENV || 'development').length);
}


var router = express.Router();
//END REDIS CONNECTION

router.route('/')
  .get(function(request, response){
    client.hgetall('questions', function(error, questions){
      if(error) throw error;
      var items = [];
      for(i in questions){
        items.push(JSON.parse(questions[i]));
      }
      response.json(items);
    });
  })
  .post(urlencode, function(request, response){
    var newQuestion = request.body;
    if(!newQuestion.title || !newQuestion.content){
      response.sendStatus(400);
      return false;
    }
    var key = Date.now()+(newQuestion.title.replace(/\W/g, ''));
    var newQuestionInfo = JSON.stringify({'title': newQuestion.title, 'content': newQuestion.content, 'id': key});

    client.hset('questions', key, newQuestionInfo, function(error){
        if(error) throw error;
    });
    client.hget('questions', key, function(error, info){
        var infoObj = JSON.parse(info);
        response.status(201).json(infoObj);
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
