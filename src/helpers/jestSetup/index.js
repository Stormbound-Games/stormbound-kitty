// String.prototype.replaceAll is not available in Node 14-, which prevents Jest
// from running tests properly.
if (typeof String.prototype.replaceAll !== 'function') {
  String.prototype.replaceAll = function (from, to) {
    return this.replace(new RegExp(from, 'g'), to)
  }
}
