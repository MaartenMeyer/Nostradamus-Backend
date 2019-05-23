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

