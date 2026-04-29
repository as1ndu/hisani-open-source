// public/js/constants.js
var fe_server_origin = "https://hisani.cassandra.technology";

// public/js/worker.js
var server_origin = fe_server_origin;
async function pull_every_campaign() {
  const list = await fetch(`${server_origin}/campaigns/all`);
  const respose = await list.json();
  return respose;
}
setInterval(async () => {
  console.log("worker ...");
  const list = await pull_every_campaign();
  self.postMessage(list);
}, 3e3);
//# sourceMappingURL=worker.js.map
