"use strict";

const fs = require("fs");
const path = require("path");

const along = require("@turf/along").default;
const length = require("@turf/length").default;
const turf = require("@turf/helpers");

const { Agency } = require("./agency");
const output = require("./output");

/**
 * Extracts the routes from a mixed dataset of routes and stops.
 * @param {turf.FeatureCollection} data The mixed LineString (routes) and Point (stops) GeoJSON.
 * @returns {turf.FeatureCollection} The LineString (routes) GeoJSON.
 */
function extractRoutes(data) {
    const routes = data.features.filter((feature) => feature.geometry.type === "LineString");

    return turf.featureCollection(routes);
}

/**
 * Extracts the stops from a mixed dataset of routes and stops.
 * @param {turf.FeatureCollection} data The mixed LineString (routes) and Point (stops) GeoJSON.
 * @returns The Point (stops) GeoJSON.
 */
function extractStops(data) {
    const stops = data.features.filter((feature) => feature.geometry.type === "Point");

    return turf.featureCollection(stops);
}

/**
 * Load route data for the agency.
 * @param {Agency} agency An Agency object.
 * @returns {Object} { routes, stops }, {turf.FeatureCollection} for each layer.
 */
exports.load = (agency) => {
    const agencyFile = path.join(agency.directory, agency.key + ".geojson");
    const routesFile = path.join(agency.directory, agency.key + "-routes.geojson");

    if (fs.existsSync(agencyFile) && !fs.existsSync(routesFile)) {
        fs.renameSync(agencyFile, routesFile);
    }

    const mixed = JSON.parse(fs.readFileSync(routesFile));
    const routes = extractRoutes(mixed);
    const stops = extractStops(mixed);

    output.data(agency, "routes", routes);
    output.data(agency, "stops", stops);

    return {
        "routes": routes,
        "stops": stops
    };
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