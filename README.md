Testberry
=========

Testberry is a performance and benchmark testing framework for Node.js and Mocha

## Installation

```shell
npm i testberry --save-dev
```

### Usage

```js
const testberry = require('testberry');
const inspect = require('inspect');

describe('Benchmark testing', function() {
  it('String starts with ', function() {
    let result;

    // Calculate evaluation time
    testberry.test('.startsWith()', function() {
      result = 'foo'.startsWith('f');
    });

    // Check whether test has worked very well
    inspect(result).isTrue();

    // Next test
    testberry.test('.charAt(0)', function() {
      result = 'foo'.charAt(0) === 'f';
    });

    inspect(result).isTrue();

    // And a third one
    testberry.test('.test()', function() {
      result = /^f/.test('foo');
    });

    inspect(result).isTrue();
  });
});
```

### Async testing

```js
const testberry = require('testberry');
const inspect = require('inspect');

describe('Benchmark async testing', function() {
  it('String starts with ', function() {
    let result;

    // Calculate evaluation time
    testberry.testAsync('.setTimeout()', function(done) {
      setTimeout(() => {
        done()
      }, 0);
    });
  });
});
```
