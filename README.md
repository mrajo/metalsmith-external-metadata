# metalsmith-external-metadata [![Build Status](https://travis-ci.org/mrajo/metalsmith-external-metadata.svg)](https://travis-ci.org/mrajo/metalsmith-external-metadata)

> A Metalsmith plugin for adding metadata from an external source file

This plugin reads JSON files as external data sources to HTML files with the same name in the same directory.

## Usage

Given a src directory with the following files:

```
├── src/
    ├── index.html
    ├── index.json
```

Use plugin in your Metalsmith build:

```js
var Metalsmith = require('metalsmith');
var extMeta = require('metalsmith-external-metadata');

Metalsmith(__dirname)
  .use(extMeta({
    // options here
  }));
```

`index.json` will be rolled into the metadata for `index.html`.

## Options

### extensions
Type: `String`
Default: `[ '.json' ]`

Sets the list of extensions.

MIT © [Anthony Castle](http://github.com/mrajo)
