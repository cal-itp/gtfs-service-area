"use strict";

const buffer = require("@turf/buffer").default;
const dissolve = require("@turf/dissolve").default;

const { Agency } = require("../agency");
const output = require("../output");


/**
 * Perform the buffer action on the agency's stops.
 * @param {Agency} agency An Agency object.
 */
function bufferStops(agency) {
    return buffer(agency.stops, agency.bufferRadius);
}

/**
 * Create a disjoint service area by buffering each stop on each route.
 * @param {Agency} agency An Agency object.
 */
exports.buffered = (agency) => {
    const buffered = bufferStops(agency);

    output.data(agency, "buffer-stops", buffered);

    console.log(`${agency.key}: buffer created from route stops (radius: ${agency.bufferRadius} km)`);
};

/**
 * Create a disjoint service area by buffering each stop on each route, and then dissolving those buffers together.
 * @param {Agency} agency An Agency object.
 */
exports.dissolved = (agency) => {
    const buffered = bufferStops(agency);
    const dissolved = dissolve(buffered);

    output.data(agency, "buffer-stops-dissolved", dissolved);

    console.log(`${agency.key}: dissolved buffer created from route stops (radius: ${agency.bufferRadius} km)`);
}