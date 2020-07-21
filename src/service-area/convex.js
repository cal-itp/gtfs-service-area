"use strict";

const convex = require("@turf/convex").default;
const turf = require("@turf/helpers");

const { endpoint } = require("../routes");
const output = require("../output");

/**
 * Create a convex hull service area using the endpoints of each route line.
 * @param {Object} agency An entry from the `agencies` array in `config.json`.
 */
module.exports = (agency) => {
    let points = [];

    agency.routes.features.forEach((route) => {
        const point = endpoint(route);
        points.push(point);
    });

    const featureColl = turf.featureCollection(points);
    const hull = convex(featureColl);

    output.data(agency, "convex", hull);

    console.log(`${agency.agency_key}: convex created from route line endpoints`);
};