let testberry = require('../lib/testberry');
let inspect = require('inspect.js');

describe('[Benchmark]', function() {
  describe('Runtime for 1000 iterations', function() {
    it('String starts with', function() {
      let result;

      // Calculate evaluation time
      testberry.test('.startsWith()', function() {
        result = 'foo'.startsWith('f');
      });

      // Check whether test has worked very well
      inspect(result).isTrue();

      // Next test
      testberry.test('.indexOf(0)', function() {
        result = 'foo'.indexOf('f') === 0;
      });

      inspect(result).isTrue();

      // And a third one
      testberry.test('.test()', function() {
        result = /^f/.test('foo');
      });

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
