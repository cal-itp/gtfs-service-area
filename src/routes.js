"use strict";

const fs = require("fs");
const path = require("path");

const along = require("@turf/along").default;
const length = require("@turf/length").default;
const turf = require("@turf/helpers");

const { Agency } = require("./agency");

/**
 * Load route data for the agency.
 * @param {Agency} agency An Agency object.
 * @returns {turf.FeatureCollection} The GeoJSON route lines.
 */
exports.load = (agency) => {
    const agencyFile = path.join(agency.directory, agency.key + ".geojson");
    const routesFile = path.join(agency.directory, agency.key + "-routes.geojson");

    if (fs.existsSync(agencyFile) && !fs.existsSync(routesFile)) {
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