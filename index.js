'use strict';

var format = require('util').format;
var fs = require('fs');
var opn = require('opn');
var path = require('path');
var temp = require('temp-write');

const HTML = `
<!doctype html>
<html>
  <head>
    <style>
      %s
    </style>
  </head>
  <body>
    %s
  </body>
</html>
`;

/**
 * Generates an HTML page from a JSON object.
 * @param {object} value - Input JSON.
 * @returns {string} HTML page displaying the JSON.
 */
module.exports = module.exports.parse = function parse(value) {
  const css = fs.readFileSync(path.join(__dirname, 'assets/style.css'));
  const output = processItem('root', value);

  return format(HTML, css, output);
}

/**
 * Generates an HTML page from a JSON object, writes it to disk, and opens the file in the user's browser.
 * @param {object} json - Input JSON.
 */
module.exports.open = function open(json) {
  let output = module.exports(json);
  return temp(output).then(path => {
    opn(path);
  });
}

/**
 * Print the HTML for a key/value pair. If the value is an array or object, this function is called recursively.
 * @param {string|number} key - Object or array key.
 * @param {*} value - Object or array value.
 * @returns {string} Parsed key/value pair as HTML.
 */
function processItem(key, value) {
  let newValue = '';

  // Recursively process arrays and objects
  if (value !== null && (typeof value === 'object' || Array.isArray(value))) {
    let inner = '';

    for (let i in value) {
      inner += processItem(i, value[i]);
    }

    newValue = `<div class="group">${inner}</div>`;
  }
  else {
    newValue = value;
  }

  return `
    <div class="value">
      <strong>${key}</strong>
      ${newValue}
    </div>
  `;
}
