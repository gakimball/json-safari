'use strict';

var expect = require('chai').expect;
var safari = require('..');

const INPUT = require('../package.json');

describe('json-safari', () => {
  describe('#parse', () => {
    it('generates an HTML browser from a JSON file', () => {
      let output = safari(INPUT);
      expect(output).to.be.a('string');
    });
  });

  describe('#open', () => {
    it('generates an HTML browser from a JSON file', done => {
      safari.open(INPUT).then(done);
    });
  });
});
