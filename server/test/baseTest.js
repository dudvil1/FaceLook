const chai = require("chai");
var sinonChai = require("sinon-chai");
const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;
chai.use(sinonChai);

const sinon = require('sinon');

module.exports = { assert, should, expect, sinon } 