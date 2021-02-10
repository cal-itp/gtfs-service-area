"use strict";

const { exit } = require("process");

const gtfsToGeoJSON = require("gtfs-to-geojson");

const agencies = require("./agency");
const loadConfig = require("./config");

const config = loadConfig();

// Run gtfsToGeoJSON, which generates the output directory and the agency file
gtfsToGeoJSON(config).then(() => {
    // Continue processing each agency
    config.agencies = agencies.load(config);
    config.agencies.forEach((agency) => agency.computeServiceArea());
    exit(0);
})
.catch(err => {
    console.error(err);
    exit(1);
});
