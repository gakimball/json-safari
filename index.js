'use strict';

var format = require('util').format;
var opn = require('opn');
var temp = require('temp-write');

const HTML = `
<!doctype html>
<html>
  <head>
    <style>
      .group,
      .value {
        padding: 0.5rem;
      }

      .group {
        border: 1px solid red;
      }

      .value {
        border: 1px solid blue;
        margin-bottom: 0.5rem;
      }
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
  return format(HTML, processItem('root', value));
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
