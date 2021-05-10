# gtfs-service-area

Compute a transit service area from static [GTFS](https://gtfs.org/reference/static). Results are output as single-layer `.geojson` files.

**NOTE**: The functionality in this tool has been incorporated into the upstream [`gtfs-to-geojson`][gtfsgeojson]. This repo is now read-only and is no longer maintained.

## Examples

The [`example`](example/) directory contains output using GTFS data from [Big Blue Bus][bbb] and [Monterey-Salinas Transit][mst], with settings from the [sample config file](config.sample.json) in this repository.

## Getting Started

Create a configuration file from the sample:

```bash
cp config.sample.json config.json
```

Edit the collection of `agencies` as needed:

```json
"agencies": [
    {
        "agency_key": "agency1",
        "url": "https://www.agency1.com/gtfs.zip"
    },
    {
        "agency_key": "agency2",
        "url": "https://www.agency2.com/gtfs.zip"
    }
],
```

### Option 1: Use [`docker-compose`](https://docs.docker.com/compose/)

````bash
docker-compose run pipeline
````

### Option 2: Use [`npm`](https://www.npmjs.com/)

1. Install dependencies:

    ```bash
    npm install
    ```

1. Run the generator:

    ```bash
    npm start
    ```

Check the `geojson` directory for output:

```bash
.
├── geojson
│   ├── agency1
│   │   ├── agency1-routes.geojson  <-- GTFS route lines
│   │   ├── agency1-stops.geojson   <-- GTFS route stops
│   │   ├── agency1-service-area-1.geojson   <-- Computed service area(s)
│   │   └── agency1-service-area-2.geojson
│   ├── agency2
│   │   ├── agency2-routes.geojson  <-- GTFS route lines
│   │   ├── agency2-stops.geojson   <-- GTFS route stops
│   │   ├── agency2-service-area-1.geojson   <-- Computed service area(s)
│   │   └── agency2-service-area-2.geojson
```

## Service Areas

This tool calculates service area using a number of different methods:

| Type              | Description                                  |
|-------------------|----------------------------------------------|
| `envelope`        | [Bounding box][bbox] around routes lines     |
| `convex`          | [Convex hull][convex] around route endpoints |
| `stops`           | [Buffer][buffer] around stops                |
| `stops-dissolved` | [Dissolve][dissolve] the buffer around stops |

The configuration file allows for specifying which service area calculation(s) are used, per-agency and/or on the run as a whole, with the `serviceAreas` key:

```json
{
  "agencies": [
    {
      "agency_key": "agency1",
      "url": "https://www.agency1.com/gtfs.zip",
    },
    {
      "agency_key": "agency2",
      "url": "https://www.agency2.com/gtfs.zip",
      "serviceAreas": [
        "stops"
      ]
    }
  ],
  "serviceAreas": [
    "envelope",
    "convex",
    "stops",
    "stops-dissolved"
  ]
}
```

In the above example:

* `agency1`: all 4 service area calculations from the top-level `serviceAreas` will run as no override was specified.
* `agency2`: the top-level `serviceAreas` have been overridden and only the `stops` calculation will run.

### Stop Buffers

For the `stops` and `stops-dissolved` calculation, an additional configuration key `bufferRadiusMeters` can be specified, either at the top-level or per-agency, to control the radius of buffers (in meters):

```json
{
  "agencies": [
    {
      "agency_key": "agency1",
      "url": "https://www.agency1.com/gtfs.zip",
      "serviceAreas": [
        "stops"
      ]
    },
    {
      "agency_key": "agency2",
      "url": "https://www.agency2.com/gtfs.zip",
      "serviceAreas": [
        "stops-dissolved"
      ],
      "bufferSizeMeters": 750
    }
  ],
  "bufferSizeMeters": 400
}
```

In the above example:

* `agency1`: calculate a 400 meter buffer around stops, using the top-level `bufferSizeMeters`.
* `agency2`: calculate a 750 meter buffer around stops, using the override `bufferSizeMeters`.

## Additional Configuration

The configuration data is passed through to [`gtfs-to-geojson`][gtfsgeojson], and you may use any of the [supported options](https://github.com/BlinkTagInc/gtfs-to-geojson#configuration).

*Note that this project may override some options as necessary for calculating service areas.*

[bbb]: http://gtfs.bigbluebus.com
[bbox]: http://wiki.gis.com/wiki/index.php/Minimum_bounding_rectangle
[buffer]: http://wiki.gis.com/wiki/index.php/Buffer_(GIS)
[convex]: http://wiki.gis.com/wiki/index.php/Convex_hull
[dissolve]: http://wiki.gis.com/wiki/index.php/Dissolve
[gtfsgeojson]: https://github.com/BlinkTagInc/gtfs-to-geojson
[mst]: https://mst.org/about-mst/developer-resources/
