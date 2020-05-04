const chai = require("chai");
const sinonChai = require("sinon-chai");
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;
chai.use(sinonChai);
chai.use(chaiHttp);

const sinon = require('sinon');

module.exports = { chai, assert, should, expect, sinon } 

