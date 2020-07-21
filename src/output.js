"use strict";

const fs = require("fs");
const path = require("path");

const turf = require("@turf/helpers");

const { Agency } = require("./agency");

/**
 * Return the path to the data output directory for the agency.
 * @param {Agency} agency An Agency object.
 */
exports.directory = (agency) => path.join(".", "geojson", agency.key);

/**
 * Return a file path for the agency and file type.
 * @param {Agency} agency An Agency object.
 * @param {String} type   The type of the file.
 */
exports.filepath = (agency, type) => path.join(this.directory(agency), `${agency.key}-${type}.geojson`);

/**
 * Serialize service area data to a file in the data output directory.
 * @param {Agency} agency               An Agency object.
 * @param {String} type                 The type of the service area.
 * @param {turf.FeatureCollection} data The GeoJSON data of the service area.
 */
exports.data = (agency, type, data) => {
    const filename = this.filepath(agency, type);

    fs.writeFileSync(filename, JSON.stringify(data));
};