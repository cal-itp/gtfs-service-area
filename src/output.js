"use strict";

const fs = require("fs");
const path = require("path");

const turf = require("@turf/helpers");

const { Agency } = require("./agency");

/**
 * Return the path to the data output directory for this agency.
 * @param {Agency} agency An Agency object.
 */
exports.directory = (agency) => `./geojson/${agency.key}`;

/**
 * Serialize service area data to a file in the data output directory.
 * @param {Agency} agency               An Agency object.
 * @param {String} type                 The type of the service area, used as a file suffix.
 * @param {turf.FeatureCollection} data The GeoJSON data of the service area.
 */
exports.data = (agency, type, data) => {
    const filename = path.join(agency.directory, `${agency.key}-${type}.geojson`);

    fs.writeFileSync(filename, JSON.stringify(data));
};