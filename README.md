# Cabot Trail Relay Masters Tracker

Static Leaflet app for visualizing the 2026 Cabot Trail Relay masters-category battle around the Cabot Trail.

## Contents

- `index.html` - app shell and Leaflet CDN includes.
- `styles.css` - map overlays, responsive layout, and day/night styling.
- `app.js` - route loading, KML parsing, standings, leg controls, and playback.
- `results_data.json` - per-leg team result data.
- `locations_coords.json` - transition-point coordinate source data.
- `Cabot Trail Relay legs.kml` - official transition-point KML source.
- `logo.png` - app logo.

## Run Locally

Serve the directory with any static web server so browser `fetch()` calls can load the local JSON and KML files:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

The app uses Leaflet, Carto map tiles, Google Fonts, and OSRM routing from public CDNs/APIs.

