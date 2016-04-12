'use strict';

var format = require('util').format;

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

module.exports = module.exports.parse = function parse(json) {
  return format(HTML, JSON.stringify(json, null, '  '));
}
