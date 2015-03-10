var request = require('supertest');
var app = require('./../app');

describe('Requests to the root path', function(){
  it('Returns a 200 status code', function(done){
    request(app)
      .get('/')
      .expect(200,done);
  });

  it('Returns an HTML format', function(done){
      request(app)
        .get('/')
        .expect('Content-Type', /html/, done)
   });

  it('Returns an index file with API documentation', function(done){
      request(app)
        .get('/')
        .expect(/documentation/i, done);
   });

});

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


describe('Requests to the questions path', function(){
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