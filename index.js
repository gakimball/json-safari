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

module.exports = module.exports.parse = parse;

/**
 * Generates an HTML page from a JSON object.
 * @param {object} value - Input JSON.
 * @returns {string} HTML page displaying the JSON.
 */
function parse(value) {
  let output = '';

  for (let i in value) {
    output += process(i, value[i]);
  }

  return format(HTML, `
    <div class="group">
      <strong>root</strong>
      ${output}
    </div>
  `);
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

function process(key, value) {
  let newValue = '';

  // Recursively process arrays and objects
  if (value !== null && (typeof value === 'object' || Array.isArray(value))) {
    let inner = '';

    for (let i in value) {
      inner += process(i, value[i]);
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
