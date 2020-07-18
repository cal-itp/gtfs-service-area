# gtfs-service-area

Compute a transit service area from static [GTFS](https://gtfs.org/reference/static).

## Running

1. Edit the collection of `agencies` in [`config.json`](config.json) as needed:

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

1. Run the generator:

    ````bash
    docker-compose run app
    ````

1. Check the [`geojson`](geojson/) directory for output:

    ```bash
    .
    ├── geojson
    │   ├── agency1
    │   │   ├── agency1.geojson     <-- GTFS route lines
    │   │   └── envelope.geojson    <-- Computed envelope
    │   ├── agency2
    │   │   ├── agency2.geojson
    │   │   └── envelope.geojson
    ```
