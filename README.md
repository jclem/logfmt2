# logfmt2

logfmt2 (which is based on the original [logfmt](https://github.com/csquared/node-logfmt) and the original [blog post](https://brandur.org/logfmt) is a module for encoding objects into the logfmt format and decoding them again.

## Install

```
npm install @jclem/logfmt2
```

## Build

```
script/build
```

## Publish

The `script/publish` script cleans the build directory, builds the project, and then runs `npm publish`.

```
script/publish
```

## Usage

```javascript
const {encode, decode} = require('@jclem/logfmt2')

console.log(encode({foo: 'bar'})) // foo=bar
console.log(decode('foo=bar')) // {foo: 'bar'}
```
