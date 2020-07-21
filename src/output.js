"use strict";

const fs = require("fs");

const turf = require("@turf/helpers");

/**
 * Return the path to the output directory for this agency.
 * @param {String} agency An entry from the `agencies` array in `config.json`.
 */
exports.directory = (agency) => `./geojson/${agency.agency_key}`;

/**
 * Serialize service area data to a file.
 * @param {String} agency                          An entry from the `agencies` array in `config.json`.
 * @param {String} serviceAreaType                 The type of the service area.
 * @param {turf.FeatureCollection} serviceAreaData The GeoJSON data of the service area.
 */
exports.data = (agency, serviceAreaType, serviceAreaData) => {
    const filename = `${agency.output_dir}/${agency.agency_key}-${serviceAreaType}.geojson`;

    fs.writeFileSync(filename, JSON.stringify(serviceAreaData));
};