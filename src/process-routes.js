"use strict";

const fs = require("fs");

module.exports = (agency, outputDir) => {
    const agencyFile = `${outputDir}/${agency}.geojson`;
    const routesFile = `${outputDir}/${agency}-routes.geojson`;

    if (fs.existsSync(agencyFile)) {
        fs.renameSync(agencyFile, routesFile);
    }

    const routes = JSON.parse(fs.readFileSync(routesFile));

    return routes;
};