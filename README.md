# JSON Safari

An HTML viewer for JSON objects.

## Installation

```bash
npm install json-safari
```

## Usage

Create an HTML page to view a JSON object:

```js
var safari = require('json-safari');

var json = { /* ... */ };
safari(json); // => <!doctype html>...</html>
```

Create a page and automatically open it in your web browser:

```js
var safari = require('json-safari').open;

var json = { /* ... */ };
safari(json);
```
