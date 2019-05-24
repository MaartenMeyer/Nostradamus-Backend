// De gedownloade libraries uit node_modules.
const chai      = require('chai');
const chaiHttp  = require('chai-http');
const jwt       = require('jsonwebtoken');
const server    = require('./app.js');

chai.should();
chai.use(chaiHttp);

const registerApp       ='/api/register';
const loginApp          ='/api/login';
const authorization     = 'Authorization';

let token;

// Informatie nodig voordat de testen kunnen worden gerund.
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

// De testen als controle voor de applicatie.
describe('Register', () => {

    it('Register valid user', done => {
        chai.request(server)
            .post('/api/register')
            .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.a("User is registered");
                done();
            })
    });

    it('Register unvalid user', done => {
        chai.request(server)
            .post('/api/register')
            .end(function (err, res) {
                res.should.have.status(500);
                res.should.be.a('object');
                done();
            })
    });
});
describe('Login', () => {

    it('Login valid user', done => {
        chai.request(server)
            .post('/api/login')
            .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            })
    });

    it('Login unvalid user', done => {
        chai.request(server)
            .post('/api/login')
            .end(function (err, res) {
                res.should.have.status(501);
                res.body.should.be.a('object');
                done();
            })
    });
});
