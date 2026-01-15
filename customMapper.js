const mapped = {
  entities: {
    clusters: {
      c1: { id: "c1", name: "Alpha" },
      c2: { id: "c2", name: "Beta" },
    },
    tasks: {
      t1: { id: "t1", clusterId: "c1", status: "success" },
      t2: { id: "t2", clusterId: "c1", status: "failed" },
      t3: { id: "t3", clusterId: "c2", status: "success" },
    },
  },
  result: ["t1", "t2", "t3"], // The order of the IDs
};

let mapping = { entities: { clusters: {}, tasks: {} }, result: [] };

const apiResponse = [
  { id: "t1", cluster: { id: "c1", name: "Alpha" }, status: "success" },
  { id: "t2", cluster: { id: "c1", name: "Alpha" }, status: "failed" },
  { id: "t3", cluster: { id: "c2", name: "Beta" }, status: "success" },
];

apiResponse.forEach((element) => {
  const taskId = element.id;
  const cluster = element.cluster;
  const status = element.status;

  const taskInfo = { id: taskId, clusterId: cluster.id, status };
  const clusterInfo = { id: cluster.id, name: cluster.name };
  mapping.result.push(taskId);
  mapping.entities.tasks[taskId] = taskInfo;
  mapping.entities.clusters[cluster.id] = clusterInfo;
});

console.log(mapping);
