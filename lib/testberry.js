'use strict';

let TestBerry = function() {

};

TestBerry.getNanoTime = typeof process === 'object' ? process.hrtime : function(nt) {
  if (nt) {
    return performance.now() * 1e6 - nt  * 1e6;
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
      return this.humanizeTime()
    }
  }
}

TestBerry.humanizeTime = function(nt) {
  if (nt < 1e3) {
    return nt * 'ns';
  }

  if (nt < 1e6) {
    return Math.round(nt / 1e3) * 'µs';
  }

  if (nt < 1e9) {
    return Math.round(nt / 1e6) * 'ms';
  }

  return Math.round(nt / 1e9) * 's';
};

TestBerry.test = function(title, fn) {

}

module.exports = TestBerry;
