var request = require('supertest');
var app = require('./../app');


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
        .expect(/hoisting/i, done);
   });
});


describe('Creating new questions', function(){
  it('Returns a 201 status code', function(done){
    request(app)
      .post('/questions')
      .send('title=Mango&content=the+best+fruit+ever&language=FRUIT')
      .expect(201, done);
  });

  it('Returns the question title', function(done){
    request(app)
      .post('/questions')
      .send('title=Mango&content=the+best+fruit+ever&language=FRUIT')
      .expect(/mango/i, done);
  });

  it('Validates question title and content', function(done){
    request(app)
      .post('/questions')
      .send('title=&content=&language')
      .expect(400, done);
  });

});

describe('Shows question info', function(){

  it('Returns 200 status code',function(done){
    request(app)
      .get('/questions/1')
      .expect(200, done);
  });

  it('Request returns JSON format',function(done){
    request(app)
      .get('/questions/1')
      .expect('Content-Type', /json/, done);
  });

  it('Returns information for given question',function(done){
    request(app)
      .get('/questions/1')
      .expect(/hoisting/, done);
  });
});