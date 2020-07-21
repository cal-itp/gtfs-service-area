"use strict";

const bbox = require("@turf/bbox").default;
const bboxPoly = require("@turf/bbox-polygon").default;

const { Agency } = require("../agency");
const output = require("../output");

/**
 * Create a bounding-box service area envelope from route line data.
 * @param {Agency} agency An Agency object.
 */
module.exports = (agency) => {
    const envelope = bboxPoly(bbox(agency.routes));

    output.data(agency, "envelope", envelope);

    console.log(`${agency.key}: envelope created from routes`);
};