const Lock = () => {
  return {
    lockQueue: new Array(),
    locked: false
  }
}

const acquire = async (lock) => {
  if (lock.locked) {
    let that = lock;
    await new Promise((resolve) => {
      that.lockQueue.push(resolve);
    });
  }
  lock.locked = true;
  return true;
};


const release = (lock) => {
  lock.locked = false;
  const resolve = lock.lockQueue.pop();
  if (resolve) {
    resolve();
  }
}

export {Lock, acquire, release};