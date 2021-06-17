const fs = require("fs");
const path = require("path");

const loadTrackingPath = path.resolve(
  __dirname,
  "../node_modules/@vue/apollo-composable/dist/util/loadingTracking.js",
);

fs.writeFileSync(
  loadTrackingPath,
  fs.readFileSync(loadTrackingPath, "utf8").replace(/\.\$root/m, ".root"),
);
