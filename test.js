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

//Informatie nodig voordat de testen kunnen worden gerund.
before(() => {
  console.log('before');

  const payload = {
    UserId: 6
  };

  jwt.sign({ data: payload }, 'secretkey', { expiresIn: 60 * 60 * 24 }, (err, result) => {
    if (result) {
      token = result;
    }
  })
});

beforeEach(() => {
  console.log('- beforeEach');
});

// De testen voor de registratie.
describe('Register', () => {
  it('Register a valid user', done => {
    chai.request(server)
      .post('/api/register')
      .set('Content-Type', 'application/json')

      .send({
        "firstName": "Rick",
        "lastName": "van Vliet",
        "userName": "rvvliet3",
        "dateOfBirth": "1999-08-24",
        "emailAddress": "helloworld3@gmail.com",
        "password": "HelloWorld66",
        "accountType": 1,
        "userNumber": 1256663
      })

      .end(function (err, res) {
        res.body.should.be.a('object');
        done()
      })
  });

  it('Register an invalid user', done => {
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
        res.body.should.be.a('object');
        done()
      })
  })
});

// De testen voor het inloggen.
describe('Login', () => {
  it('Login with a valid user', done => {
    chai.request(server)
      .post('/api/login')
      .set('Content-Type', 'application/json')

      .send( {
        "userName": "rvvliet3",
        "password": "HelloWorld66"
      })

      .end(function (err, res) {
        res.body.should.be.a('object');
        done()
      })
  });

  it('Login with an unvalid user', done => {
    chai.request(server)
      .post('/api/login')
      .set('Content-Type', 'application/json')

      .send( {
        "userName": "helloworld",
        "password": "SecretKey11"
      })

      .end(function (err, res) {
        res.body.should.be.a('object');
        done()
      })
  })
});

// De testen voor clocking.
describe('Clocking', () => {
  it('Clocking with a valid userNumber', done => {
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

  it('Clocking with an invalid userNumber', done => {
    chai.request(server)
      .post('/api/clocking')
      .set(authorization, 'Bearer ' + token)
      .send( {
        "userNumber": 0,
        "branchId": 1,
        "departmentId": 1
      })

      .end(function (err, res) {
        res.body.should.be.a('object');
        done()
      })
  });

  it('clocking with invalid token', done => {
    chai.request(server)
      .post('/api/clocking')
      .set(authorization, 'Bearer ' + '"sdfdxdbxbgsskj-/sfvxdfsbdffghsdfb"')
      .send({
        "userNumber": 14,
        "branchId": 2,
        "departmentId": 1
      })
      .end(function(err, res) {
        res.body.should.be.a('object');
        done();
      })
  });
});

