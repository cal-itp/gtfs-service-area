"use strict";

const buffer = require("@turf/buffer").default;
const dissolve = require("@turf/dissolve").default;

const { Agency } = require("../agency");
const output = require("../output");

/**
 * Create a disjoint service area by buffering each stop on each route.
 * @param {Agency} agency An Agency object.
 */
module.exports = (agency) => {
    const buffered = buffer(agency.stops, agency.bufferRadius);
    let dissolved = dissolve(buffered);

    output.data(agency, "buffer-stops", buffered);
    output.data(agency, "buffer-stops-dissolved", dissolved);

    console.log(`${agency.key}: buffer created from route stops`);
};