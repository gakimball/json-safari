'use strict';

var format = require('util').format;
var opn = require('opn');
var temp = require('temp-write');

const HTML = `
<!doctype html>
<html>
  <head>
  </head>
  <body>
    <pre>%s</pre>
  </body>
</html>
`;

module.exports = module.exports.parse = parse;

/**
 * Generates an HTML page from a JSON object.
 * @param {object} json - Input JSON.
 * @returns {string} HTML page displaying the JSON.
 */
function parse(json) {
  return format(HTML, JSON.stringify(json, null, '  '));
}

/**
 * Generates an HTML page from a JSON object, writes it to disk, and opens the file in the user's browser.
 * @param {object} json - Input JSON.
 */
module.exports.open = function open(json) {
  let output = parse(json);
  return temp(output).then(path => {
    opn(path);
  });
}
