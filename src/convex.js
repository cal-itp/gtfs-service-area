"use strict";

const fs = require("fs");

const along = require("@turf/along").default;
const convex = require("@turf/convex").default;
const length = require("@turf/length").default;
const turf = require("@turf/helpers");

module.exports = (agency, routes, outputDir) => {
    let points = [];

    routes.features.forEach((line) => {
        const len = length(line);
        const endpoint = along(line, len);
        points.push(endpoint);
    });

    const featureColl = turf.featureCollection(points);
    const hull = convex(featureColl);

    fs.writeFileSync(`${outputDir}/${agency}-convex.geojson`, JSON.stringify(hull));
    console.log(`${agency}: convex created from route line endpoints`);
};