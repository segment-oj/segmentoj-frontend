class AWaitLock {
  constructor() {
    this.lockQueue = [];
    this.locked = false;
  }

  async acquire() {
    if (this.locked) {
      let that = this;
      await new Promise((resolve) => {
        that.lockQueue.push(resolve);
      });
    }
    this.locked = true;
    return true;
  }

  release() {
    this.locked = false;
    let resolve = this.lockQueue.pop();
    if (resolve) {
      resolve();
    }
  }
}

export default AWaitLock;