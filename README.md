# gtfs-service-area

Compute a transit service area from static [GTFS](https://gtfs.org/reference/static).

## Example

The [`example`](example/) directory contains sample output using GTFS data from the [Big Blue Bus](http://gtfs.bigbluebus.com).

* [`bbb-envelope.geojson`](example/bbb-envelope.geojson) is the computed service area as a bounding box.
* [`bbb-routes.geojson`](example/bbb-routes.geojson) is the combined route data.


## Configuration and running

Edit the collection of `agencies` in [`config.json`](config.json):

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
│   │   ├── agency1-envelope.geojson  <-- Computed envelope
│   │   └── agency1-routes.geojson    <-- GTFS route lines
│   ├── agency2
│   │   ├── agency2-envelope.geojson
│   │   └── agency2-routes.geojson
```
