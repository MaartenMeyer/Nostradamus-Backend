// The used libraries from node_modules.
const chai      = require('chai');
const chaiHttp  = require('chai-http');
const jwt       = require('jsonwebtoken');
const server    = require('./app.js');

chai.should();
chai.use(chaiHttp);

// The connection with the authorization.
const authorization = 'Authorization';

let token;

//Information needed for the tests
before(() => {
  console.log('before');

  const payload = {
    UserId: 3
  };

  jwt.sign({ data: payload }, 'secretkey', { expiresIn: 60 * 60 * 24 }, (err, result) => {
    if (result) {
      token = result;
    }
  })
});

// The tests for registration.
describe('Register', () => {
  it('Register a valid user.', done => {
    chai.request(server)
      .post('/api/register')
      .set('Content-Type', 'application/json')

      .send({
        "firstName": "Rick",
        "lastName": "van Vliet",
        "userName": "rvvliet25",
        "dateOfBirth": "1999-08-24",
        "emailAddress": "helloworld25@gmail.com",
        "password": "HelloWorld66",
        "accountType": 1,
        "userNumber": 12566625
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
        "userName": "SteveJobs1",
        "password": "secret"
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
  it('Clocking with a valid userNumber.', done => {
    chai.request(server)
      .post('/api/clocking')
      .set(authorization, 'Bearer ' + token)

        .send( {
        "userNumber": 1256663,
        "branchId": 1,
        "departmentId": 1
      })

      .end(function (err, res) {
        res.body.should.be.a('object');
        done()
      })
  });

  it('Clocking with a not valid userNumber.', done => {
    chai.request(server)
      .post('/api/clocking')
      .set(authorization, 'Bearer ' + token)

        .send( {
        "userNumber": 0,
        "branchId": 1,
        "departmentId": 1
      })

      .end(function (err, res) {
        res.should.have.status(401);
        res.body.should.be.a('object');
        done()
      })
  });

  it('clocking with a not valid token', done => {
    chai.request(server)
      .post('/api/clocking')
      .set(authorization, 'Bearer ' + '"sdfdxdbxbgsskj-/sfvxdfsbdffghsdfb"')

        .send({
        "userNumber": 14,
        "branchId": 2,
        "departmentId": 1
      })

      .end(function(err, res) {
        res.should.have.status(401);
        res.body.should.be.a('object');
        done();
      })
  })
});

// The tests for breaking
describe('Breaking', () => {
   it('Breaking with a valid userNumber.', done => {
       chai.request(server)
           .post('/api/breaking')
           .set(authorization, 'Bearer ' + token)

           .send({
               "userNumber": 12566624
           })


           .end(function (err, res) {
               res.body.should.be.a('object');
               done()
           })
   });

    it('Breaking with a not valid userNumber.', done => {
        chai.request(server)
            .post('/api/breaking')
            .set(authorization, 'Bearer ' + token)

            .send( {
                "userNumber": 0
            })

            .end(function (err, res) {
                res.should.have.status(401);
                res.body.should.be.a('object');
                done()
            })
    });

    it('Breaking with a not valid token.', done => {
        chai.request(server)
            .post('/api/breaking')
            .set(authorization, 'Bearer ' + '"durhfrnecbrufbreu43"')

            .send({
                "userNumber": 12345
            })

            .end(function (err, res) {
                res.should.have.status(401);
                res.body.should.be.a('object');
                done()
            })
    });
});



