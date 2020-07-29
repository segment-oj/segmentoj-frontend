if (String.prototype.replaceAll === undefined) {
  String.prototype.replaceAll = function (before, after) {
    let res = new String(), matched = 0;
    for (let i = 0; i < this.length; i += 1) {
      if (this[i] == before[matched]) {
        matched += 1;
        if (matched == before.length) {
          res += after;
          matched = 0;
        }
      } else {
        matched = 0;
        res += this[i];
      }
    }
    return res;
  };
}