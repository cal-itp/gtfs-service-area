"use strict";

const { exit } = require("process");

const gtfsToGeoJSON = require("gtfs-to-geojson");
const mongoose = require("mongoose");

const agencies = require("./agency");
const config = require("../config.json");
//ensure we produce a single output geojson for all agency routes
config.outputType = "agency";

// Mongo used by gtfsToGeoJSON
// GTFS files read and loaded, and queried back out to produce GeoJSON
mongoose.connect(config.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

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
