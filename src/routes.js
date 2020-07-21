"use strict";

const fs = require("fs");

const along = require("@turf/along").default;
const length = require("@turf/length").default;
const turf = require("@turf/helpers");

/**
 * Load route data for the agency.
 * @param {Object} agency An entry from the `agencies` array in `config.json`.
 * @returns {turf.FeatureCollection} The GeoJSON route lines.
 */
exports.load = (agency) => {
    const agencyFile = `${agency.output_dir}/${agency.agency_key}.geojson`;
    const routesFile = `${agency.output_dir}/${agency.agency_key}-routes.geojson`;

    if (fs.existsSync(agencyFile)) {
        fs.renameSync(agencyFile, routesFile);
    }

    const routes = JSON.parse(fs.readFileSync(routesFile));

    return routes;
};

/**
 * Find a point at the end of the route.
 * @param {turf.Feature} route The GeoJSON route line.
 * @returns {turf.Feature} The GeoJSON point.
 */
exports.endpoint = (route) => {
    const len = length(route);
    const endpoint = along(route, len);

    return endpoint;
};