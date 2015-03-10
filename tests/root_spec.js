var request = require('supertest');
var app = require('./../app');
var redis = require('redis');
var client = redis.createClient();
client.select('test'.length);
client.flushdb();

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