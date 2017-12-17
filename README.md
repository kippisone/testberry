Testberry
=========

Testberry is a performance and benchmark testing framework for Node.js and Mocha

## Installation

```shell
npm i testberry --save-dev
```

### Usage

```js
import testberry from 'testberry'
import inspect from 'inspect'

describe('Benchmark testing', () => {
  it('String starts with ', () => {
    let result

    // Calculate evaluation time
    testberry.test('.startsWith()', () => {
      result = 'foo'.startsWith('f')
    })

    // Check whether test has worked very well
    inspect(result).isTrue()

    // Next test
    testberry.test('.charAt(0)', () => {
      result = 'foo'.charAt(0) === 'f'
    })

    inspect(result).isTrue()

    // And a third one
    testberry.test('.test()', () => {
      result = /^f/.test('foo')
    })

      inspect(result).isTrue();
    });
  });

  describe('Invocations in 1000 ms', function() {
    it('String starts with', function() {
      let result;

      // Calculate evaluation time
      testberry.perf('.startsWith()', 100, function() {
        result = 'foo'.startsWith('f');
      });

      // Check whether test has worked very well
      inspect(result).isTrue();

      // Next test
      testberry.perf('.indexOf("f")', 100, function() {
        result = 'foo'.indexOf('f') === 0;
      });

      inspect(result).isTrue();

      // And a third one
      testberry.perf('.test()', 100, function() {
        result = /^f/.test('foo');
      });

      inspect(result).isTrue();
    });
  })
});
```

### Async testing

```js
const testberry = require('testberry');
const inspect = require('inspect');

describe('Benchmark async testing', function() {
  it('String starts with', function() {
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
