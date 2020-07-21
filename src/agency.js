"use strict";

const output = require("./output");
const routes = require("./routes");
const implementations = require("./service-area");

/**
 * Represents a transit agency that publishes static GTFS.
 */
class Agency {
    /**
     * Initialize an Agency instance from data in `config.json`.
     * @param {Object} agency An entry from the `agencies` array in `config.json`.
     */
    constructor(agency, config) {
        this.config = config;
        this.key = agency.agency_key;
        this.url = agency.url;

        // first determine the data directory
        this.directory = output.directory(this);
        // then load route data
        this.routes = routes.load(this);

        // figure out which service area calculations to use
        const serviceAreas = agency.serviceAreas || config.serviceAreas || [];
        // map each into the corresponding implementation function
        this.serviceAreas = serviceAreas.map((sa) => {
            return { name: sa, compute: implementations[sa] }
        });
    }

    computeServiceArea() {
        this.serviceAreas.forEach((serviceArea) => serviceArea.compute(this));
    }
};

/**
 * Convert each agency in `config.json` to an Agency.
 * @param {Object} config The parsed `config.json` file.
 * @returns {Array<Agency>} The list of Agencies.
 */
function load(config) {
    const agencies = config.agencies.map((agency) => new Agency(agency, config));

    return agencies;
};

module.exports = {
    Agency,
    load
};