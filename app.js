const { exit } = require("process");
const fs = require("fs");

const gtfsToGeoJSON = require("gtfs-to-geojson");
const mongoose = require("mongoose");
const st = require("geojson-bounds");

const config = require("./config.json");

mongoose.connect(config.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

gtfsToGeoJSON(config).then(() => {
  config.agencies.forEach(agency => {
    const dir = `./geojson/${agency.agency_key}`;
    const routesFile = `${dir}/${agency.agency_key}-routes.geojson`

    fs.renameSync(`${dir}/${agency.agency_key}.geojson`, routesFile);

    const routes = fs.readFileSync(routesFile);
    const envelope = st.envelope(JSON.parse(routes));

    fs.writeFileSync(`${dir}/${agency.agency_key}-envelope.geojson`, JSON.stringify(envelope));
    console.log(`${agency.agency_key}: envelope.geojson created`);
  });

  exit(0);
})
.catch(err => {
  console.error(err);

  exit(0);
});
