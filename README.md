Testberry
=========

[![Build Status](https://travis-ci.com/kippisone/testberry.svg?branch=develop)](https://travis-ci.com/kippisone/testberry)

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
    testberry.test('.indexOf(0)', () => {
      result = 'foo'.indexOf(0) === 'f'
    })

    inspect(result).isTrue()

    // And a third one
    testberry.test('.test()', () => {
      result = /^f/.test('foo')
    })

    inspect(result).isTrue()
  })
})
```
