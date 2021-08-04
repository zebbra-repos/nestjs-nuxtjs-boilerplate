const fs = require("fs");
const path = require("path");

const endings = [".esm.js", ".esm.js.map", ".js", ".js.map"];

function applyPatch(ending) {
  const loadTrackingPath = `${path.resolve(
    __dirname,
    "../node_modules/@vue/apollo-composable/dist/index",
  )}${ending}`;

  fs.writeFileSync(
    loadTrackingPath,
    fs.readFileSync(loadTrackingPath, "utf8").replace(/\.\$root/m, ".root"),
  );
}

endings.forEach(applyPatch);
