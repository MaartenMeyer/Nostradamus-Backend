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

//Information that's requested before running the tests.
before(() => {
    console.log('before');

    const payload = {
        UserId: 3
    };

    jwt.sign({ data: payload }, 'secretKey', { expiresIn: 60 * 60 * 24 }, (err, result) => {
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
               "userName": "rvvliet10",
               "dateOfBirth": "1999-08-24",
               "emailAddress": "helloworld10@gmail.com",
               "password": "HelloWorld66",
               "accountType": 1,
               "userNumber": 12566610
           })

           .end(function (err, res) {
               res.should.have.status(200);
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
               "userName": "rvvliet6",
               "password": "HelloWorld66"
           })

           .end(function (err, res) {
               res.should.have.status(200);
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
                done()
            })
    })
});

// The tests for the clock system.
describe('Clocking', () => {

    it('Clocking with a valid userNumber and a valid token.', done => {
        chai.request(server)
            .post('/api/clocking')
            .set('Content-Type', 'application/json')
            .set(authorization, 'Bearer ' + '"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7IlVzZXJJZCI6M30sImlhdCI6MTU1ODk2MTY3OCwiZXhwIjoxNTU5MDQ4MDc4fQ.AonC0yNQ2CdvNwnqSb9FVkOQgAXSvNA25dN8bvVljag"')

            .send({
                "userNumber": 12345,
                "branchId": 1,
                "departmentId": 1
            })

            .end(function(err, res) {
                res.should.have.status(200);
                done();
            })
    });

    it('Clocking with a not valid userNumber, but a valid token.', done => {
        chai.request(server)
            .post('/api/clocking')
            .set('Content-Type', 'application/json')
            .set(authorization, 'Bearer ' + '"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7IlVzZXJJZCI6M30sImlhdCI6MTU1ODk2MDg4NywiZXhwIjoxNTU5MDQ3Mjg3fQ.UUTqHS_GYdiWkBQXvu-zRQKe37Lss9eBYEUKDeWMAFk"')

            .send( {
                "userNumber": 0,
                "branchId": 1,
                "departmentId": 1
            })

            .end(function (err, res) {
                res.should.have.status(401);
                done()
            })
    });

    it('Clocking with a valid userNumber, but a not valid token.', done => {
        chai.request(server)
            .post('/api/clocking')
            .set('Content-Type', 'application/json')
            .set(authorization, 'Bearer ' + '"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7IlVzZXJJZCI6M30sImlhdCI6MTU1ODk2MDg4NywiZXhwIjoxNTU5MDQ3Mjg3fQ.UUTqHS_GYdiWkBQXvu-zRQKe37Lss9eBYEUKDeWMAk"')

            .send({
                "userNumber": 12345,
                "branchId": 1,
                "departmentId": 1
            })

            .end(function(err, res) {
                res.should.have.status(401);
                done();
            })
    })
});

