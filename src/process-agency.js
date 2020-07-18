"use strict";

const fs = require("fs");

const processRoutes = require("./process-routes");
const envelope = require("./envelope");

module.exports = (agency) => {
    const agency_key = agency.agency_key;
    const outputDir = `./geojson/${agency_key}`;

    const routes = processRoutes(agency_key, outputDir);

    envelope(agency_key, routes, outputDir);
};