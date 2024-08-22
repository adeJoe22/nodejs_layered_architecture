import fs from "node:fs/promises";
import { Worker } from "worker_threads";

// fs.access
function findSum(n: number) {
  return new Promise((resolve, reject) => {
    const work = new Worker("", { workerData: { n } });
    work.on("message", resolve);
    work.on("error", reject);
  });
}
