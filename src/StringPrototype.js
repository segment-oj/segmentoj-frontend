if (String.prototype.replaceAll === undefined) {
  String.prototype.replaceAll = function (before, after) {
    let res = new String(), matched = 0;
    for (let i = 0; i < this.length; i += 1) {
      if (this[i] === before[matched]) {
        matched += 1;
        if (matched === before.length) {
          res += after;
          matched = 0;
        }
      } else {
        matched = 0;
        res += this[i];
      }
    }

    for (let i = this.length - matched; i < this.length; i += 1) {
      res += this[i];
    }
    
    return res;
  };
}

if (String.prototype.trim === undefined) {
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };
}