// The used libraries from node_modules.
const chai      = require('chai');
const chaiHttp  = require('chai-http');
const server    = require('./app.js');

chai.should();
chai.use(chaiHttp);

// The connection with the authorization.
const authorization = 'Authorization';

// The tests for registration.
describe('Register', () => {
  it('Register a valid user.', done => {
    chai.request(server)
      .post('/api/register')
      .set('Content-Type', 'application/json')

      .send({
        "firstName": "Rick",
        "lastName": "van Vliet",
        "userName": "rvvliet17",
        "dateOfBirth": "1999-08-24",
        "emailAddress": "helloworld17@gmail.com",
        "password": "HelloWorld66",
        "accountType": 1,
        "userNumber": 12566617
      })

      .end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done()
      })
  });
  it('Register a not valid user.', done => {
    chai.request(server)
      .post('/api/register')
      .set('Content-Type', 'application/json')

      .send({
        "firstName": "Frenkie",
        "lastName": "de Jong",
        "userName": "FdeJong2",
        "dateOfBirth": "1999-06-31",
        "emailAddress": "thegoat2@ajax.nl",
        "password": "secret",
        "accountType": 3,
        "userNumber": 976
      })

      .end(function (err, res) {
        res.should.have.status(500);
        res.body.should.be.a('object');
        done()
      })
  })
});

// The tests for login.
describe('Login', () => {
  it('Login with a valid user.', done => {
    chai.request(server)
      .post('/api/login')
      .set('Content-Type', 'application/json')

      .send( {
        "userName": "rvvliet14",
        "password": "HelloWorld66"
      })

      .end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done()
      })
  });
  it('Login with a not valid user.', done => {
    chai.request(server)
      .post('/api/login')
      .set('Content-Type', 'application/json')

      .send( {
        "userName": "helloworld",
        "password": "SecretKey11"
      })

      .end(function (err, res) {
        res.should.have.status(401);
        res.body.should.be.a('object');
        done()
      })
  })
});

// The tests for clocking.
describe('Clocking', () => {
  it('Clocking with a valid userNumber and a valid token.', done => {
    chai.request(server)
      .post('/api/clocking')
      .set(authorization, 'Bearer ' + "'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7IlVzZXJJZCI6M30sImlhdCI6MTU1OTA0MzA4NiwiZXhwIjoxNTU5MTI5NDg2fQ.OQfwa04KniWj0RURTLnU5ITpKjRrDKZVj8QqBykvYHc'")

        .send( {
        "userNumber": 12345,
        "branchId": 1,
        "departmentId": 1
      })

      .end(function (err, res) {
        res.body.should.be.a('object');
        done()
      })
  });
  it('Clocking with a not valid userNumber, but a valid token', done => {
    chai.request(server)
      .post('/api/clocking')
      .set(authorization, 'Bearer ' + '"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7IlVzZXJJZCI6M30sImlhdCI6MTU1OTA0MzA4NiwiZXhwIjoxNTU5MTI5NDg2fQ.OQfwa04KniWj0RURTLnU5ITpKjRrDKZVj8QqBykvYHc"')

        .send( {
        "userNumber": 637392727378732,
        "branchId": 1,
        "departmentId": 1
      })

      .end(function (err, res) {
        res.should.have.status(500);
        res.body.should.be.a('object');
        done()
      })
  });
  it('Clocking with a valid userNumber, but a not valid token', done => {
    chai.request(server)
      .post('/api/clocking')
      .set(authorization, 'Bearer ' + '"sdfdxdbxbgsskj-/sfvxdfsbdffghsdfb"')

        .send({
        "userNumber": 12345,
        "branchId": 1,
        "departmentId": 1
      })

      .end(function(err, res) {
        res.should.have.status(401);
        res.body.should.be.a('object');
        done();
      })
  })
});

// The tests for breaking.
describe('Breaking', () => {
    it('Breaking with a valid userNumber and a valid token.', done => {
       chai.request(server)
           .post('/api/breaking')
           .set(authorization, 'Bearer ' + '"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7IlVzZXJJZCI6M30sImlhdCI6MTU1OTA0MzA4NiwiZXhwIjoxNTU5MTI5NDg2fQ.OQfwa04KniWj0RURTLnU5ITpKjRrDKZVj8QqBykvYHc"')

           .send( {
               "userNumber": 12345
           })

           .end(function (err, res) {
               res.should.have.status(200);
               res.body.should.be.a('object');
               done();
           })
   });
    it('Breaking with a not valid userNumber, but a valid token.', done => {
        chai.request(server)
            .post('/api/breaking')
            .set(authorization, 'Bearer ' + '"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7IlVzZXJJZCI6M30sImlhdCI6MTU1OTA0MzA4NiwiZXhwIjoxNTU5MTI5NDg2fQ.OQfwa04KniWj0RURTLnU5ITpKjRrDKZVj8QqBykvYHc"')

            .send( {
                "userNumber": 535265736782
            })

            .end(function (err, res) {
                res.should.have.status(500);
                res.body.should.be.a('object');
                done();
            })
    });
    it('Breaking with a valid userNumber, but a not valid token.', done => {
        chai.request(server)
            .post('/api/breaking')
            .set(authorization, 'Bearer ' + '"5MTI4MTk1fQ.xa5zclkUvlOjqYPaBOHTvJ9ekvJBdyoN5ZuNOS2NwN8"')

            .send( {
                "userNumber": 12345
            })

            .end(function (err, res) {
                res.should.have.status(401);
                res.body.should.be.a('object');
                done();
            })
    })
});

// The tests for active.
describe('Active', () => {
   it('Get active employees by a valid token.', done => {
      chai.request(server)
          .get('/api/active')
          .set(authorization, 'Bearer ' + "'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7IlVzZXJJZCI6M30sImlhdCI6MTU1OTA0MzA4NiwiZXhwIjoxNTU5MTI5NDg2fQ.OQfwa04KniWj0RURTLnU5ITpKjRrDKZVj8QqBykvYHc'")

          .end(function (err, res) {
              res.should.have.status(200);
              res.body.should.be.a('object');
              done();
          })
   });
    it('Get active employees by a not valid token.', done => {
        chai.request(server)
            .get('/api/active')
            .set(authorization, 'Bearer ' + '"degryu4y43y72748842y4hdu4hyd4y4387"')

            .end(function (err, res) {
                res.should.have.status(401);
                res.body.should.be.a('object');
                done();
            })
    })
});

