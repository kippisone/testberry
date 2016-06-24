'use strict';

let inspect = require('inspect.js');
let sinon = require('sinon');
inspect.useSinon(sinon);

let testberry = require('../lib/testberry');

describe('Testberry', function() {
  describe('time()', function() {
    let getTimeStub;
    let sandbox = sinon.sandbox.create();

    beforeEach(function() {
      getTimeStub = sandbox.stub(testberry, 'getNanoTime');
    });

    afterEach(function() {
      sandbox.restore();
    });

    it('Should calculate a timespan in nanoseconds', function() {
      getTimeStub.returns([0, 333]);
      getTimeStub.onCall(1).returns([0, 1]);

      let timer = testberry.time();
      inspect(timer).isObject();
      inspect(timer.nanotime).isArray().isEql([0, 333]);

      let res = timer.stop();
      inspect(res).isString().isEql('1ns');
    });

    it('Should calculate a timespan of 333 nanoseconds', function() {
      getTimeStub.returns([0, 333]);
      getTimeStub.onCall(1).returns([0, 333]);

      let timer = testberry.time();
      let res = timer.stop();
      inspect(res).isString().isEql('333ns');
    });

    it('Should calculate a timespan of 999 nanoseconds', function() {
      getTimeStub.returns([0, 333]);
      getTimeStub.onCall(1).returns([0, 999]);

      let timer = testberry.time();
      let res = timer.stop();
      inspect(res).isString().isEql('999ns');
    });
  });

  describe('profile()', function() {
    it('Should profile a function', function() {
      let func = function(msg) {
        return 'bla' + msg;
      };

      let msg = testberry.profile(func, 'blub');
      inspect(msg).isEql('blablub');
      inspect(testberry.getLastProfiling()).hasProps({
        args: ['blub'],
        callTime: sinon.match(/^\d+/),
        name: 'anonymous function',
        returnValue: 'blablub',
        type: 'func'
      });
    });

    it('Should profile a callback function', function(done) {
      let func = function(msg, cb) {
        cb(null, 'bla' + msg);
      };

      testberry.profile(func, 'blub', function() {
        done();
      });

      let profiling = testberry.getLastProfiling();
      inspect.print(profiling);
      inspect(profiling).hasProps({
        args: ['blub', sinon.match.func],
        callTime: sinon.match(/^\d+/),
        name: 'anonymous function',
        returnValue: undefined,
        type: 'cb-func',
        callbackCalls: [{
          callTime: sinon.match(/^\d+/),
          callArgs: [null, 'blablub']
        }]
      });
    });

    it('Should profile a promise function', function() {
      let func = function(msg) {
        return Promise.resolve('bla' + msg);
      };

      testberry.profile(func, 'blub');

      let profiling = testberry.getLastProfiling();
      inspect.print(profiling);
      inspect(profiling).hasProps({
        args: ['blub', sinon.match.func],
        callTime: sinon.match(/^\d+/),
        name: 'anonymous function',
        returnValue: undefined,
        type: 'pm-func',
        promiseCalls: [{
          callTime: sinon.match(/^\d+/),
          thenCall: ['blablub'],
          catchCall: undefined
        }]
      });
    });

    it('Should profile a promise function', function() {
      let func = function(msg) {
        return Promise.resolve('bla' + msg);
      };

      let p = testberry.profile(func, 'blub');

      return p.then(res => {
        let profiling = testberry.getLastProfiling();
        inspect.print(profiling);
        inspect(profiling).hasProps({
          args: ['blub', sinon.match.func],
          callTime: sinon.match(/^\d+/),
          name: 'anonymous function',
          returnValue: undefined,
          type: 'pm-func',
          promiseCalls: [{
            callTime: sinon.match(/^\d+/),
            thenCall: ['blablub'],
            catchCall: undefined
          }]
        });
      });
    });
  });
});
