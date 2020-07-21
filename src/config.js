"use strict";

/**
 * Parse and return the `config.json` file.
 * @returns {Object} The parsed file.
 */
module.exports = () => {
    let config = require("../config.json");

    //ensure the internally-required properties
    config.outputType = "agency";
    config.includeStops = true;
    config.zipOutput = false;

    return config;
};