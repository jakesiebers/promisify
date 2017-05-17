
const assert = require('assert');

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
chai.should();


const promisify = require('../index.js');


function Test() {
  this.value = 5;
};

Test.prototype.getValue = promisify(function(callback) {
  callback(null, this.value);
});

Test.prototype.firstArg = promisify(function(val, callback) {
  callback(null, val);
});

Test.prototype.getValueWithExtraArg = promisify(function(val, callback) {
  callback(null, this.value);
});

Test.prototype.maintainThisInternalArrowFunc = promisify(function(callback) {
  const test = promisify(callback => callback(null, this.value));
  test().then(res => callback(null, res));
});

Test.prototype.throwError = promisify(function(callback) {
  callback(new Error());
});

const arrowFunc = promisify(callback => callback(null, 2));


// Run tests
describe('Service tests', () => {
  it('this is maintained', () => (new Test()).getValue().should.eventually.equal(5));
  it('Can pass and arg', () => (new Test()).firstArg(4).should.eventually.equal(4));
  it('Can use deprecated callback for backwards compatability', () => (new Promise((resolve, reject) => (new Test()).firstArg(3, (err, data) => resolve(data)))).should.eventually.equal(3));
  it('call with missing arg', () => (new Test()).getValueWithExtraArg().should.eventually.equal(5));
  it('Wrapped arrow func', () => arrowFunc().should.eventually.equal(2));
  it('Maintain This internal Arrow Func', () => (new Test()).maintainThisInternalArrowFunc().should.eventually.equal(5));
  it('Promise rejected on error', () => (new Test()).throwError().should.eventually.be.rejected);
  it('Error is passed to deprecated callback for backwards compatability', () => (new Promise((resolve, reject) => (new Test()).throwError((err, data) => (err ? reject(err) : resolve(data))))).should.eventually.be.rejected);
});
