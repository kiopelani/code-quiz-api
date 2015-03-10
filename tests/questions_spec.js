var request = require('supertest');
var app = require('./../app');
var redis = require('redis');
var client = redis.createClient();
client.select('test'.length);
client.flushdb();

describe('Listing questions on questions path', function(){

  it('Returns a 200 status code', function(done){
    request(app)
      .get('/questions')
      .expect(200, done);
  });

  it('Returns a JSON format', function(done){
      request(app)
        .get('/questions')
        .expect('Content-Type', /json/, done)
   });

  it('Returns all questions', function(done){
      request(app)
        .get('/questions')
        .expect([], done);
   });
});


describe('Creating new questions', function(){

  it('Returns a 201 status code', function(done){
    request(app)
      .post('/questions')
      .send('title=Mango&content=the+best+fruit+ever&language=FRUIT')
      .expect(201, done);
  });

  it('Returns the question id', function(done){
    request(app)
      .post('/questions')
      .send('title=Mango&content=the+best+fruit+ever&language=FRUIT')
      .expect(/mango/i, done);
  });

  it('Validates question title and content', function(done){
    request(app)
      .post('/questions')
      .send('title=&content=&language=')
      .expect(400, done);
  });

});

describe('Returns question info', function(){
  var mangoInfo = JSON.stringify({'title': 'mango', 'content': 'the best fruit ever', 'language': 'FRUIT'});
  tempKey = Date.now()+'mango';

  before(function(){
    client.hset('questions', tempKey, mangoInfo);
  });

  after(function(){
    client.flushdb();
  });

  it('Returns 200 status code',function(done){
    request(app)
      .get('/questions/'+tempKey)
      .expect(200, done);
  });

  it('Request returns JSON format',function(done){
    request(app)
      .get('/questions/'+tempKey)
      .expect('Content-Type', /json/, done);
  });

  it('Gets information for given question',function(done){
    request(app)
      .get('/questions/'+tempKey)
      .expect(/fruit/, done);
  });
});

//MOVE TITLE TO ID FOR ALL TESTS