"use strict";

const fs = require("fs");

const bbox = require("@turf/bbox").default;
const bboxPoly = require("@turf/bbox-polygon").default;

module.exports = (agency, routes, outputDir) => {
    const envelope = bboxPoly(bbox(routes));

    fs.writeFileSync(`${outputDir}/${agency}-envelope.geojson`, JSON.stringify(envelope));
    console.log(`${agency}-envelope.geojson created`);
};