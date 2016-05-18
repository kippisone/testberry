'use strict';

let TestBerry = function() {

};

TestBerry.getNanoTime = typeof process === 'object' ? process.hrtime : function(nt) {
  if (nt) {
    let t2 = performance.now();
    return t2 * 1e6 - nt  * 1e6;
  }

  return performance.now();
}

TestBerry.time = function() {
  return {
    nanotime: TestBerry.getNanoTime(),
    stop: function() {
      let t = TestBerry.getNanoTime(this.nanotime);
      if (Array.isArray(t)) {
        t = t[0] * 1e9 + t[1];
      }
      return TestBerry.humanizeTime(t);
    }
  }
}

TestBerry.humanizeTime = function(nt) {
  if (nt < 1e3) {
    return nt * 'ns';
  }

  if (nt < 1e6) {
    return Math.round(nt / 1e3) + 'µs';
  }

  if (nt < 1e9) {
    return Math.round(nt / 1e6) + 'ms';
  }

  return Math.round(nt / 1e9) + 's';
};

TestBerry.test = function(title, fn) {
  let time = TestBerry.time();
  let passed = false;
  let error;

  try {
    fn.call();
    passed = true;
  } catch(err) {
    error = err.stack || err;
  }

  let runtime = time.stop();
  if (passed) {
    console.log('⏱ Messurement of ' + title + ' toked ' + runtime);
  }
  else {
    console.log('⏱ Messurement of ' + title + ' failed after ' + runtime);
    console.log('Error: ' + error);
  }
}

if (typeof module === 'undefined') {
  window.testberry = TestBerry;
}
else {
  module.exports = TestBerry;
}
