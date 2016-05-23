'use strict';

let inspect = require('inspect.js');
let sinon = require('sinon');
inspect.useSinon(sinon);

let Testberry = require('../lib/testberry');

describe('Testberry', function() {
  describe('time()', function() {
    let getTimeStub;
    let sandbox = sinon.sandbox.create();

    beforeEach(function() {
      getTimeStub = sandbox.stub(Testberry, 'getNanoTime');
    });

    afterEach(function() {
      sandbox.restore();
    });

    it('Should calculate a timespan in nanoseconds', function() {
      getTimeStub.returns([0, 333]);
      getTimeStub.onCall(1).returns([0, 1]);

      let timer = Testberry.time();
      inspect(timer).isObject();
      inspect(timer.nanotime).isArray().isEql([0, 333]);

      let res = timer.stop();
      inspect(res).isString().isEql('1ns');
    });

    it('Should calculate a timespan of 333 nanoseconds', function() {
      getTimeStub.returns([0, 333]);
      getTimeStub.onCall(1).returns([0, 333]);

      let timer = Testberry.time();
      let res = timer.stop();
      inspect(res).isString().isEql('333ns');
    });

    it('Should calculate a timespan of 999 nanoseconds', function() {
      getTimeStub.returns([0, 333]);
      getTimeStub.onCall(1).returns([0, 999]);

      let timer = Testberry.time();
      let res = timer.stop();
      inspect(res).isString().isEql('999ns');
    });
  });
});
