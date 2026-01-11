// The "Expensive" API
const getClustersReal = async (ids) => {
  console.log("API CALLED WITH:", ids);
  // Returns [{id: 1, name: 'A'}, {id: 2, name: 'B'}]
  return ids.map((id) => ({ id, name: `Cluster ${id}` }));
};

const createBatcher = (batchedApi, delay) => {
  let queue = [];
  let timeoutId = null;
  const fet = (id) => {
    return new Promise((resolve) => {
      queue.push({ id, resolve });

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(async () => {
        // SNAPSHOT and RESET immediately
        const currentBatch = [...queue];
        queue = [];
        timeoutId = null;

        const args = currentBatch.map((ele) => ele.id);
        const res = await batchedApi(args);

        currentBatch.forEach((el) => {
          el.resolve(res.find((item) => item.id === el.id));
        });
      }, delay);
    });
  };

  return fet;
};

const batchFetch = createBatcher(getClustersReal, 50);

// These 3 calls happen almost simultaneously
batchFetch(1).then(console.log);
batchFetch(2).then(console.log);
batchFetch(3).then(console.log);

// EXPECTED CONSOLE OUTPUT:
// "API CALLED WITH: [1, 2, 3]" (Only logged ONCE)
// {id: 1, name: "Cluster 1"}
// {id: 2, name: "Cluster 2"}
// {id: 3, name: "Cluster 3"}
