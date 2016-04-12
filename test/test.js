'use strict';

var expect = require('chai').expect;
var safari = require('..');

const INPUT = require('../package.json');

describe('json-safari', () => {
  it('generates an HTML browser from a JSON file', () => {
    let output = safari(INPUT);
    console.log(output);
  });
});
