"use strict";

const bbox = require("@turf/bbox").default;
const bboxPoly = require("@turf/bbox-polygon").default;

const output = require("../output");

/**
 * Create a bounding-box service area envelope from route line data.
 * @param {Object} agency An entry from the `agencies` array in `config.json`.
 */
module.exports = (agency) => {
    const envelope = bboxPoly(bbox(agency.routes));

    output.data(agency, "envelope", envelope);

    console.log(`${agency.agency_key}: envelope created from routes`);
};