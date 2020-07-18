"use strict";

const { exit } = require("process");

const gtfsToGeoJSON = require("gtfs-to-geojson");
const mongoose = require("mongoose");

const config = require("../config.json");
const processAgency = require("./process-agency");

mongoose.connect(config.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

gtfsToGeoJSON(config).then(() => {
    config.agencies.forEach(processAgency);
    exit(0);
})
.catch(err => {
    console.error(err);
    exit(1);
});
