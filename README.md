# gtfs-service-area

Compute a transit service area from static [GTFS](https://gtfs.org/reference/static).

## Examples

The [`example`](example/) directory contains sample output using GTFS data from [Big Blue Bus][bbb] and [Monterey-Salinas Transit][mst].

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
    },
    // ... etc.
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

1. Edit `mongoUrl` in [`config.json`](config.json) with the URL of a MongoDB server.

1. Run the generator:

    ```bash
    npm start
    ```

Check the [`geojson`](geojson/) directory for output:

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

[bbb]: http://gtfs.bigbluebus.com
[mst]: https://mst.org/about-mst/developer-resources/