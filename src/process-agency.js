"use strict";

const output = require("./output");
const routes = require("./routes");

const envelope = require("./service-area/envelope");
const convex = require("./service-area/convex");

/**
 * Generate service area GeoJSON layers for the agency.
 * @param {Object} agency An entry from the `agencies` array in `config.json`.
 * @param {Object} config The parsed `config.json` object.
 */
module.exports = (agency, config) => {
    agency.output_dir = output.directory(agency);
    agency.routes = routes.load(agency);

    envelope(agency);
    convex(agency);
};