function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      resolve(undefined);
    }

    promises.forEach((p) => {
      Promise.resolve(p).then(resolve, reject);
    });
  });
}
