// De gedownloade libraries uit node_modules.
const chai      = require('chai');
const chaiHttp  = require('chai-http');
const jwt       = require('jsonwebtoken');
const server    = require('./app.js');
const assert    = require('assert');

chai.should();
chai.use(chaiHttp);

const registerApp       ='/api/register';
const loginApp          ='/api/login';
const authorization     = 'Authorization';

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
               "firstName": "Frenkie",
               "lastName": "de Jong",
               "userName": "FdeJong2",
               "dateOfBirth": "1999-12-31",
               "emailAddress": "thegoat2@ajax.nl",
               "password": "secret",
               "accountType": 1,
               "userNumber": 342
           })

           .end(function (err, res, body) {
               res.should.have.status(200);
               res.shoud.be.a("User is registered");
               done()
           })
   });

    it('Register an  unvalid user', done => {
        chai.request(server)
            .post('/api/register')
            .set('Content-Type', 'application/json')
            .send({
                "firstName": "Frenkie",
                "lastName": "de Jong",
                "userName": "FdeJong69",
                "dateOfBirth": "1999-12-31",
                "emailAddress": "thegoat2@ajax.nl",
                "password": "secret",
                "accountType": 3,
                "userNumber": 976
            })

            .end(function (err, res, body) {
                res.should.have.status(500);
                res.should.be.a('object');
                done()
            })
    })
});

