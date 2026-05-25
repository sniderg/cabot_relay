// Cabot Trail Relay 2026 App Logic

// Geographic Coordinates for each transition point around the Cabot Trail
const WAYPOINTS = [
    { name: "Start: Gaelic College", lat: 46.2123136, lon: -60.6050169, desc: "The epic relay begins at the Gaelic College in St. Ann's." },
    { name: "Leg 1 Finish: North River Bridge", lat: 46.3079692, lon: -60.6181544, desc: "North River Bridge Church transition point." },
    { name: "Leg 2 Finish: Clucking Hen Cafe", lat: 46.4074937, lon: -60.4822147, desc: "Indian Brook seacoast transition outside the Clucking Hen Cafe." },
    { name: "Leg 3 Finish: Wreck Cove", lat: 46.5159078, lon: -60.427047, desc: "Wreck Cove General Store seaside transition." },
    { name: "Leg 4 Finish: Cape Smokey Ski Lodge", lat: 46.6282579, lon: -60.4210067, desc: "Transition at the base of Cape Smokey Ski Lodge." },
    { name: "Leg 5 Finish: Warren Lake Entrance", lat: 46.7125314, lon: -60.3649378, desc: "Near the entrance to Warren Lake and Broad Cove camp." },
    { name: "Leg 6 Finish: Neil's Harbour", lat: 46.8245034, lon: -60.360775, desc: "Neil's Harbour coastal transition." },
    { name: "Leg 7 Finish: Cape North", lat: 46.8840503, lon: -60.4993916, desc: "Cape North junction transition on the main Cabot Trail." },
    { name: "Leg 8 Finish: Big Interval", lat: 46.8301813, lon: -60.6151343, desc: "Scenic valley transition in Big Interval." },
    { name: "Leg 9 Finish: Pleasant Bay", lat: 46.8199958, lon: -60.7960975, desc: "Mountain View Motel in Pleasant Bay, following North Mountain climb." },
    { name: "Leg 10 Finish: Benjie's Lake", lat: 46.7470363, lon: -60.8216643, desc: "Rest area transition in Cape Breton Highlands at Benjie's Lake trailhead." },
    { name: "Leg 11 Finish: Trout Brook", lat: 46.7060354, lon: -60.9404325, desc: "Trout Brook transition point." },
    { name: "Leg 12 Finish: Cheticamp", lat: 46.6232881, lon: -61.0181952, desc: "Cheticamp Mall / Campground area." },
    { name: "Leg 13 Finish: Margaree Harbour", lat: 46.495907, lon: -61.0742909, desc: "Margaree Harbour coastal transition." },
    { name: "Leg 14 Finish: Margaree Forks", lat: 46.3343211, lon: -61.0977602, desc: "Margaree Forks transition." },
    { name: "Leg 15 Finish: Lakes Cafe", lat: 46.2812376, lon: -60.9647387, desc: "Lakes Cafe transition in the Margaree Valley." },
    { name: "Leg 16 Finish: Middle River", lat: 46.1564234, lon: -60.9232476, desc: "Middle River church transition." },
    { name: "Leg 17 Finish: Baddeck Court House", lat: 46.0998888, lon: -60.7526618, desc: "The final finish line at the Baddeck Court House!" }
];

const LEGS_METADATA = [
    { name: "Leg 1", dist: "17.00 km", rating: "3.5", desc: "Gently rolling seacoast run to North River Bridge." },
    { name: "Leg 2", dist: "17.92 km", rating: "3.5", desc: "River valley run ending at the Clucking Hen Cafe." },
    { name: "Leg 3", dist: "13.46 km", rating: "2.0", desc: "Flat to rolling seaside run to Wreck Cove." },
    { name: "Leg 4", dist: "20.01 km", rating: "5.0", desc: "Featuring the intense, famous climb up Cape Smokey." },
    { name: "Leg 5", dist: "17.50 km", rating: "3.5", desc: "Moderate climbs to Ingonish Beach and Warren Lake." },
    { name: "Leg 6", dist: "17.50 km", rating: "4.5", desc: "Challenging seacoast hills into Neil's Harbour." },
    { name: "Leg 7", dist: "13.10 km", rating: "4.5", desc: "Dingwall coastal transition." },
    { name: "Leg 8", dist: "12.36 km", rating: "3.0", desc: "Easy rolling through Acadian farmlands." },
    { name: "Leg 9", dist: "17.48 km", rating: "5.0", desc: "The brutal North Mountain climb (385m elevation gain)." },
    { name: "Leg 10", dist: "14.70 km", rating: "5.0", desc: "Steep climb up MacKenzie Mountain to Benjie's Lake." },
    { name: "Leg 11", dist: "14.00 km", rating: "3.5", desc: "Highlands ridge rolling, followed by steep descent of French Mountain." },
    { name: "Leg 12", dist: "15.88 km", rating: "3.0", desc: "Coastal run from Trout Brook to Cheticamp." },
    { name: "Leg 13", dist: "17.50 km", rating: "2.5", desc: "Scenic coastal run from Cheticamp to Margaree Harbour." },
    { name: "Leg 14", dist: "19.81 km", rating: "4.0", desc: "Valley run along Margaree River to Margaree Forks." },
    { name: "Leg 15", dist: "15.42 km", rating: "3.0", desc: "Scenic rolling run in Margaree Valley to Lakes Cafe." },
    { name: "Leg 16", dist: "15.35 km", rating: "2.0", desc: "Flattest leg of the course heading towards Middle River." },
    { name: "Leg 17", dist: "18.70 km", rating: "4.5", desc: "The final push from Middle River into Baddeck, finish line celebration." }
];

const ELEVATIONS_DATA = [
    // Leg 1: Gently rolling seacoast
    [20, 25, 18, 30, 42, 35, 15, 22, 38, 45, 30, 15, 25, 20, 15],
    // Leg 2: Valley run
    [15, 25, 35, 45, 30, 20, 18, 28, 40, 52, 45, 30, 25, 15, 10],
    // Leg 3: Flat to rolling seaside
    [10, 15, 22, 18, 25, 30, 20, 15, 28, 35, 20, 12, 18, 15, 8],
    // Leg 4: Cape Smokey climb (famous 290m climb)
    [8, 20, 45, 95, 160, 230, 290, 285, 240, 190, 140, 100, 70, 40, 25],
    // Leg 5: Moderate climbs Ingonish
    [25, 40, 65, 80, 70, 55, 90, 115, 120, 105, 80, 55, 40, 30, 20],
    // Leg 6: Challenging seacoast hills
    [20, 45, 60, 75, 50, 65, 80, 85, 70, 55, 60, 75, 40, 25, 15],
    // Leg 7: Dingwall coast (flat)
    [15, 20, 28, 32, 25, 18, 12, 15, 24, 30, 20, 15, 10, 12, 8],
    // Leg 8: Easy rolling farmlands
    [10, 15, 20, 25, 28, 22, 18, 15, 22, 28, 20, 15, 12, 10, 12],
    // Leg 9: Brutal North Mountain (438m)
    [12, 40, 110, 210, 310, 385, 438, 435, 390, 320, 240, 150, 90, 50, 30],
    // Leg 10: MacKenzie Mountain Climb (all uphill, finishing at the summit plateau)
    [15, 35, 65, 100, 140, 180, 215, 250, 280, 305, 320, 330, 335, 338, 340],
    // Leg 11: Highlands plateau rolling followed by steep French Mountain descent
    [340, 335, 345, 338, 330, 310, 270, 220, 160, 110, 65, 35, 20, 15, 12],
    // Leg 12: Margaree Harbour flat
    [10, 12, 15, 18, 14, 12, 10, 15, 20, 16, 12, 10, 8, 12, 10],
    // Leg 13: Margaree Forks flat/rolling
    [10, 15, 25, 35, 40, 30, 22, 18, 25, 32, 28, 20, 15, 12, 10],
    // Leg 14: Margaree Valley flat
    [10, 12, 15, 18, 22, 20, 18, 15, 16, 20, 24, 20, 15, 12, 10],
    // Leg 15: Scenic rolling valley
    [10, 18, 28, 38, 48, 55, 60, 45, 35, 42, 50, 38, 25, 18, 15],
    // Leg 16: Flattest leg of the course
    [15, 16, 15, 14, 15, 16, 15, 15, 16, 15, 14, 15, 16, 15, 14],
    // Leg 17: Baddeck push rolling
    [15, 22, 38, 55, 68, 80, 75, 60, 45, 52, 60, 45, 30, 20, 12]
];

const ELEVATION_SAMPLE_INTERVAL_M = 100;
const ELEVATION_BATCH_SIZE = 100;

// Helper to convert HH:MM:SS or MM:SS to seconds
function timeToSeconds(timeStr) {
    if (!timeStr) return 0;
    const parts = timeStr.trim().split(':').map(Number);
    if (parts.length === 3) {
        return parts[0] * 3600 + parts[1] * 60 + parts[2];
    } else if (parts.length === 2) {
        return parts[0] * 60 + parts[1];
    }
    return 0;
}

// Helper to convert seconds back to standard time format
function secondsToTime(secs) {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    const mStr = m.toString().padStart(2, '0');
    const sStr = s.toString().padStart(2, '0');
    if (h > 0) {
        return `${h}:${mStr}:${sStr}`;
    }
    return `${m}:${sStr}`;
}

function formatPace(secondsPerKm) {
    if (!Number.isFinite(secondsPerKm) || secondsPerKm <= 0) return '--:--';
    return secondsToTime(Math.round(secondsPerKm));
}

function getLegDistanceKm(index) {
    const distText = LEGS_METADATA[index]?.dist || '';
    const distanceKm = parseFloat(distText);
    return Number.isFinite(distanceKm) ? distanceKm : 0;
}

function minettiRunningCost(grade) {
    return (155.4 * grade ** 5)
        - (30.4 * grade ** 4)
        - (43.3 * grade ** 3)
        + (46.3 * grade ** 2)
        + (19.5 * grade)
        + 3.6;
}

function getLegElevationProfile(index) {
    return highResElevationProfiles[index]?.elevations || ELEVATIONS_DATA[index];
}

function getLegTerrainFactor(index) {
    const elevations = getLegElevationProfile(index);
    const distanceKm = getLegDistanceKm(index);
    if (!elevations || elevations.length < 2 || distanceKm <= 0) return 1;

    const segmentDistanceM = (distanceKm * 1000) / (elevations.length - 1);
    const costs = [];

    for (let i = 1; i < elevations.length; i++) {
        const grade = (elevations[i] - elevations[i - 1]) / segmentDistanceM;
        costs.push(minettiRunningCost(grade));
    }

    const averageCost = costs.reduce((sum, cost) => sum + cost, 0) / costs.length;
    return averageCost / minettiRunningCost(0);
}

function toRadians(degrees) {
    return degrees * Math.PI / 180;
}

function haversineDistanceMeters(a, b) {
    const earthRadiusM = 6371000;
    const dLat = toRadians(b[0] - a[0]);
    const dLon = toRadians(b[1] - a[1]);
    const lat1 = toRadians(a[0]);
    const lat2 = toRadians(b[0]);
    const sinLat = Math.sin(dLat / 2);
    const sinLon = Math.sin(dLon / 2);
    const h = sinLat * sinLat + Math.cos(lat1) * Math.cos(lat2) * sinLon * sinLon;
    return 2 * earthRadiusM * Math.asin(Math.sqrt(h));
}

function interpolateLatLng(a, b, fraction) {
    return [
        a[0] + (b[0] - a[0]) * fraction,
        a[1] + (b[1] - a[1]) * fraction
    ];
}

function resampleRouteCoordinates(coordinates, intervalM = ELEVATION_SAMPLE_INTERVAL_M) {
    if (!coordinates || coordinates.length < 2) return coordinates || [];

    const samples = [coordinates[0]];
    let distanceSinceLastSample = 0;

    for (let i = 1; i < coordinates.length; i++) {
        let segmentStart = coordinates[i - 1];
        const segmentEnd = coordinates[i];
        let segmentLength = haversineDistanceMeters(segmentStart, segmentEnd);

        while (distanceSinceLastSample + segmentLength >= intervalM && segmentLength > 0) {
            const distanceToSample = intervalM - distanceSinceLastSample;
            const fraction = distanceToSample / segmentLength;
            const sample = interpolateLatLng(segmentStart, segmentEnd, fraction);
            samples.push(sample);
            segmentStart = sample;
            segmentLength = haversineDistanceMeters(segmentStart, segmentEnd);
            distanceSinceLastSample = 0;
        }

        distanceSinceLastSample += segmentLength;
    }

    const finalPoint = coordinates[coordinates.length - 1];
    const lastSample = samples[samples.length - 1];
    if (haversineDistanceMeters(lastSample, finalPoint) > 1) {
        samples.push(finalPoint);
    }

    return samples;
}

async function fetchElevationsForPoints(points) {
    const elevations = [];

    for (let i = 0; i < points.length; i += ELEVATION_BATCH_SIZE) {
        const batch = points.slice(i, i + ELEVATION_BATCH_SIZE);
        const latitudes = batch.map(pt => pt[0].toFixed(5)).join(',');
        const longitudes = batch.map(pt => pt[1].toFixed(5)).join(',');
        const url = `https://api.open-meteo.com/v1/elevation?latitude=${latitudes}&longitude=${longitudes}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Elevation lookup failed: ${response.statusText}`);
        }
        const data = await response.json();
        if (!Array.isArray(data.elevation) || data.elevation.length !== batch.length) {
            throw new Error('Elevation lookup returned an unexpected shape.');
        }
        elevations.push(...data.elevation);
    }

    return elevations;
}

async function loadHighResElevationProfile(index) {
    if (highResElevationProfiles[index] || elevationProfileRequests[index]) return;

    const route = routeLines.find(rl => rl.index === index);
    if (!route?.coordinates || route.coordinates.length < 2) return;

    elevationProfileRequests[index] = (async () => {
        try {
            const samplePoints = resampleRouteCoordinates(route.coordinates);
            const elevations = await fetchElevationsForPoints(samplePoints);
            highResElevationProfiles[index] = {
                elevations,
                sampleCount: elevations.length,
                sampleIntervalM: ELEVATION_SAMPLE_INTERVAL_M
            };
            if (index === selectedLegIndex) {
                updateUIForSelectedLeg();
            }
        } catch (e) {
            console.error(`Failed to load high-resolution elevation profile for leg ${index + 1}:`, e);
        } finally {
            delete elevationProfileRequests[index];
        }
    })();
}

function getFlatEquivalentPace(gunTime, legIndex) {
    const distanceKm = getLegDistanceKm(legIndex);
    const terrainFactor = getLegTerrainFactor(legIndex);
    if (distanceKm <= 0 || terrainFactor <= 0) return null;

    const actualSecondsPerKm = timeToSeconds(gunTime) / distanceKm;
    return actualSecondsPerKm / terrainFactor;
}

let map;
let resultsData = [];
let selectedLegIndex = 0; // 0 = Leg 1, 16 = Leg 17
let routeLines = []; // Store Leaflet polyline paths for each leg
let markers = []; // Store transition point markers
let highResElevationProfiles = {};
let elevationProfileRequests = {};
let playbackInterval = null;
let isPlaying = false;
let hasStartedFocusing = false;

async function loadCoordinatesFromKML() {
    try {
        const response = await fetch('./Cabot Trail Relay legs.kml');
        if (!response.ok) {
            throw new Error(`Failed to fetch KML: ${response.statusText}`);
        }
        const kmlText = await response.text();
        const parser = new DOMParser();
        const kmlDoc = parser.parseFromString(kmlText, 'text/xml');
        const placemarks = kmlDoc.getElementsByTagName('Placemark');
        
        for (let i = 0; i < placemarks.length; i++) {
            const placemark = placemarks[i];
            const coordNode = placemark.getElementsByTagName('coordinates')[0];
            if (coordNode && WAYPOINTS[i]) {
                const coordText = coordNode.textContent.trim();
                const parts = coordText.split(',');
                if (parts.length >= 2) {
                    const lon = parseFloat(parts[0]);
                    const lat = parseFloat(parts[1]);
                    if (!isNaN(lat) && !isNaN(lon)) {
                        WAYPOINTS[i].lat = lat;
                        WAYPOINTS[i].lon = lon;
                    }
                }
            }
        }
        console.log("Successfully loaded coordinates from KML file.");
    } catch (e) {
        console.error("Error parsing KML, using fallback hardcoded coordinates:", e);
    }
}

// Initialize Web App
async function init() {
    await loadCoordinatesFromKML();
    initMap();
    await loadResultsData();
    renderLegList();
    updateUIForSelectedLeg();
    
    // Fetch OSRM road paths for all legs to draw the loop
    await drawCabotTrailLoop();
    
    // Bind controls
    document.getElementById('playback-toggle').addEventListener('click', togglePlayback);
    document.getElementById('playback-prev').addEventListener('click', () => selectLeg(Math.max(0, selectedLegIndex - 1), true));
    document.getElementById('playback-next').addEventListener('click', () => selectLeg(Math.min(16, selectedLegIndex + 1), true));
}

const LIGHT_TILES = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const DARK_TILES = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
let activeTileLayer = null;
// Initialize Leaflet Map
function initMap() {
    map = L.map('map', {
        zoomControl: false,
        attributionControl: false,
        zoomSnap: 0.1
    });
    
    // Fit bounds of the entire loop immediately with padding for overlays (no animation jump)
    const allCoords = WAYPOINTS.map(pt => [pt.lat, pt.lon]);
    map.fitBounds(L.latLngBounds(allCoords), {
        animate: false,
        paddingTopLeft: [40, 40],
        paddingBottomRight: [290, 40] // Offset the leaderboard on the right
    });
    
    // Initial load: Leg 1 is Day (Light Mode)
    activeTileLayer = L.tileLayer(LIGHT_TILES, {
        maxZoom: 20
    }).addTo(map);
    
    L.control.zoom({ position: 'topleft' }).addTo(map);
}

// Load results_data.json
async function loadResultsData() {
    try {
        const response = await fetch('./results_data.json');
        resultsData = await response.json();
    } catch (e) {
        console.error("Failed to load results:", e);
    }
}

// Draw the full loop using OSRM APIs leg-by-leg
async function drawCabotTrailLoop() {
    for (let i = 0; i < WAYPOINTS.length - 1; i++) {
        const startPt = WAYPOINTS[i];
        const endPt = WAYPOINTS[i + 1];
        
        // Query public OSRM server for road routing
        const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${startPt.lon},${startPt.lat};${endPt.lon},${endPt.lat}?overview=full&geometries=geojson`;
        
        try {
            const res = await fetch(osrmUrl);
            const data = await res.json();
            
            if (data.routes && data.routes.length > 0) {
                const coordinates = data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
                
                const line = L.polyline(coordinates, {
                    color: i === selectedLegIndex ? '#ffd700' : 'rgba(255, 255, 255, 0.25)',
                    weight: i === selectedLegIndex ? 5 : 3,
                    opacity: i === selectedLegIndex ? 1.0 : 0.6,
                    lineJoin: 'round'
                }).addTo(map);
                
                routeLines.push({ index: i, line: line, coordinates });
            } else {
                throw new Error("No route found");
            }
        } catch (e) {
            // Fallback to straight lines if API fails
            const line = L.polyline([[startPt.lat, startPt.lon], [endPt.lat, endPt.lon]], {
                color: i === selectedLegIndex ? '#ffd700' : 'rgba(255, 255, 255, 0.25)',
                weight: i === selectedLegIndex ? 5 : 3,
                opacity: i === selectedLegIndex ? 1.0 : 0.6
            }).addTo(map);
            routeLines.push({
                index: i,
                line: line,
                coordinates: [[startPt.lat, startPt.lon], [endPt.lat, endPt.lon]]
            });
        }
    }
    
    // Plot markers for transition points
    WAYPOINTS.forEach((pt, idx) => {
        const marker = L.circleMarker([pt.lat, pt.lon], {
            radius: idx === 0 || idx === WAYPOINTS.length - 1 ? 8 : 5,
            fillColor: idx === selectedLegIndex || idx === selectedLegIndex + 1 ? '#ffd700' : '#1e2132',
            color: '#fff',
            weight: 2,
            opacity: 1,
            fillOpacity: 1
        }).addTo(map);
        
        marker.bindPopup(`<b>${pt.name}</b><br>${pt.desc}`);
        markers.push(marker);
    });

    // Refresh active leg highlights once routes are loaded
    selectLeg(selectedLegIndex);
}

// Generate the leg scroller on the left (compact 6x3 grid)
function renderLegList() {
    const container = document.getElementById('legs-overlay-content');
    container.innerHTML = '';
    
    // First cell is the label 'Legs'
    const labelCell = document.createElement('div');
    labelCell.className = 'leg-item label-grid-cell';
    labelCell.innerHTML = '<span>Legs</span>';
    container.appendChild(labelCell);
    
    LEGS_METADATA.forEach((leg, idx) => {
        const item = document.createElement('div');
        item.className = `leg-item ${idx === selectedLegIndex ? 'active' : ''}`;
        item.id = `leg-item-${idx}`;
        item.addEventListener('click', () => selectLeg(idx, true));
        
        item.innerHTML = `<span>${idx + 1}</span>`;
        container.appendChild(item);
    });
}

// Update selections, highlights, popups, and side panels
function selectLeg(index, userTriggered = false) {
    if (index < 0 || index > 16) return;
    
    if (userTriggered) {
        hasStartedFocusing = true;
    }
    
    // Update active class in list
    const prevItem = document.getElementById(`leg-item-${selectedLegIndex}`);
    const nextItem = document.getElementById(`leg-item-${index}`);
    if (prevItem) prevItem.classList.remove('active');
    if (nextItem) nextItem.classList.add('active');
    
    selectedLegIndex = index;
    updateUIForSelectedLeg();
    
    // Day/Night transition:
    // Leg 1 to 9 (indices 0 to 8) are Day (Light map)
    // Leg 10 to 14 (indices 9 to 13) are Night (Dark map)
    // Leg 15 to 17 (indices 14 to 16) are Day (Light map)
    const isNight = index >= 9 && index <= 13;
    const nextTiles = isNight ? DARK_TILES : LIGHT_TILES;
    
    if (activeTileLayer && activeTileLayer._url !== nextTiles) {
        map.removeLayer(activeTileLayer);
        activeTileLayer = L.tileLayer(nextTiles, { maxZoom: 20 }).addTo(map);
    }
    
    // Toggle day/night class on overlays and header
    const matchupContainer = document.getElementById('matchup-overlay-container');
    const standingsContainer = document.querySelector('.map-overlay-leaderboard');
    const legsContainer = document.getElementById('legs-overlay-container');
    const headerElement = document.querySelector('header');
    if (isNight) {
        if (matchupContainer) {
            matchupContainer.classList.add('night');
            matchupContainer.classList.remove('day');
        }
        if (standingsContainer) {
            standingsContainer.classList.add('night');
            standingsContainer.classList.remove('day');
        }
        if (legsContainer) {
            legsContainer.classList.add('night');
            legsContainer.classList.remove('day');
        }
        if (headerElement) {
            headerElement.classList.add('night');
            headerElement.classList.remove('day');
        }
    } else {
        if (matchupContainer) {
            matchupContainer.classList.add('day');
            matchupContainer.classList.remove('night');
        }
        if (standingsContainer) {
            standingsContainer.classList.add('day');
            standingsContainer.classList.remove('night');
        }
        if (legsContainer) {
            legsContainer.classList.add('day');
            legsContainer.classList.remove('night');
        }
        if (headerElement) {
            headerElement.classList.add('day');
            headerElement.classList.remove('night');
        }
    }
    
    // Update map line weights and colors based on day/night mode
    routeLines.forEach(rl => {
        if (rl.index === selectedLegIndex) {
            rl.line.setStyle({ 
                color: isNight ? '#ffd700' : '#e65100', // neon gold in dark, warm orange in light
                weight: 6, 
                opacity: 1.0 
            });
            rl.line.bringToFront();
        } else {
            rl.line.setStyle({ 
                color: isNight ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.15)', 
                weight: 3, 
                opacity: 0.6 
            });
        }
    });
    
    // Update markers styles
    markers.forEach((m, idx) => {
        const isHighlight = idx === selectedLegIndex || idx === selectedLegIndex + 1;
        if (isHighlight) {
            m.setStyle({ 
                fillColor: isNight ? '#ffd700' : '#e65100', 
                color: isNight ? '#fff' : '#000',
                radius: 7 
            });
        } else {
            m.setStyle({ 
                fillColor: isNight ? '#1e2132' : '#ffffff', 
                color: isNight ? '#fff' : '#666',
                radius: idx === 0 || idx === WAYPOINTS.length - 1 ? 8 : 5 
            });
        }
    });

    // Auto-focus active leg on user interaction or playback
    if (hasStartedFocusing && routeLines.length > selectedLegIndex) {
        const activeRoute = routeLines.find(rl => rl.index === selectedLegIndex);
        if (activeRoute) {
            const bounds = activeRoute.line.getBounds();
            map.fitBounds(bounds, {
                padding: [100, 100],
                maxZoom: 11
            });
        }
    }

    loadHighResElevationProfile(index);
}

// Refresh stats, comparisons, margins, and match-ups
function updateUIForSelectedLeg() {
    const meta = LEGS_METADATA[selectedLegIndex];
    
    // Update bottom overlay playback indicators
    document.getElementById('playback-progress-bar').style.width = `${((selectedLegIndex + 1) / 17) * 100}%`;
    document.getElementById('playback-label').innerText = `${meta.name}/Leg 17`;
    
    // Render static matchup card overlay content
    const isNight = selectedLegIndex >= 9 && selectedLegIndex <= 13;
    const container = document.getElementById('matchup-overlay-container');
    if (container) {
        const elevations = getLegElevationProfile(selectedLegIndex);
        container.innerHTML = getLoopCardHtml(isNight, elevations);
    }
    
    // Render cumulative standings overlay
    renderLeaderboard();
}

function generateElevationSvg(elevations) {
    if (!elevations || elevations.length === 0) return '';
    
    // Absolute scale relative to the tallest leg (North Mountain ~438m peak)
    const min = 0;
    const max = 450;
    const range = max - min;
    
    const width = 230;
    const height = 30;
    const points = elevations.map((elev, idx) => {
        const x = (idx / (elevations.length - 1)) * width;
        const clampedElev = Math.max(min, Math.min(max, elev));
        const y = height - ((clampedElev - min) / range) * height;
        return `${x},${y}`;
    });
    
    const areaPoints = `0,${height} ${points.join(' ')} ${width},${height}`;
    const localMax = Math.max(...elevations);
    
    return `
        <div style="margin-top: 0.5rem; margin-bottom: 0.3rem;">
            <div class="elevation-header" style="display: flex; justify-content: space-between; font-size: 0.6rem; font-weight: 600; color: var(--overlay-text-secondary); margin-bottom: 0.2rem;">
                <span>Elevation Profile (Abs Scale)</span>
                <span>Peak: ${Math.round(localMax)}m</span>
            </div>
            <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: ${height}px; display: block; overflow: visible;">
                <defs>
                    <linearGradient id="elevGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="var(--overlay-primary)" stop-opacity="0.3"></stop>
                        <stop offset="100%" stop-color="var(--overlay-primary)" stop-opacity="0.0"></stop>
                    </linearGradient>
                </defs>
                <polygon points="${areaPoints}" fill="url(#elevGrad)"></polygon>
                <polyline points="${points.join(' ')}" fill="none" stroke="var(--overlay-primary)" stroke-width="1.5"></polyline>
            </svg>
        </div>
    `;
}

function getLoopCardHtml(isNight, elevations = null) {
    const meta = LEGS_METADATA[selectedLegIndex];
    const legData = resultsData[selectedLegIndex];
    if (!legData || !legData.results) return '';
    
    const sorted = [...legData.results].sort((a, b) => timeToSeconds(a.gunTime) - timeToSeconds(b.gunTime));
    let rowsHtml = '';
    sorted.forEach(row => {
        const isUser = row.runnerName.includes("Graydon Snider");
        const flatEquivalentPace = getFlatEquivalentPace(row.gunTime, selectedLegIndex);
        let teamIndicatorClass = 'hammers';
        if (row.teamKey === 'TORONTO HARRIERS MASTERS TEAM') teamIndicatorClass = 'harriers';
        if (row.teamKey === 'CB ROAD RUNNERS MASTERS') teamIndicatorClass = 'roadrunners';
        
        rowsHtml += `
            <div class="matchup-row ${row.teamKey === 'HALIFAX OLD HAMMERS' ? 'highlighted' : ''}" style="margin-bottom: 0.3rem; display: flex; justify-content: space-between; align-items: center; padding: 0.35rem 0.5rem; border-radius: 6px; background: var(--overlay-row-bg); border: 1px solid var(--overlay-row-border);">
                <div class="matchup-team" style="display: flex; align-items: center; gap: 0.35rem;">
                    <span class="team-indicator ${teamIndicatorClass}" style="width: 6px; height: 6px; border-radius: 50%;"></span>
                    <div>
                        <span class="matchup-runner" style="font-size: 0.75rem; font-weight: 500;">${row.runnerName}</span>
                        ${isUser ? '<span class="user-badge" style="background: var(--overlay-primary); color: #000; font-size: 0.5rem; padding: 0.02rem 0.15rem; border-radius: 2px; font-weight: 700; margin-left: 0.2rem;">YOU</span>' : ''}
                        <div class="matchup-team-short" style="font-size: 0.55rem; color: var(--overlay-text-secondary);">${row.teamName.split(' ')[0]}</div>
                    </div>
                </div>
                <div class="matchup-stats" style="text-align: right; font-family: var(--font-mono);">
                    <div class="matchup-time" style="font-size: 0.75rem; font-weight: 700;">${row.gunTime}</div>
                    <div class="matchup-pace" style="font-size: 0.6rem; color: var(--overlay-text-secondary);">${row.pace.trim()} min/km</div>
                    <div class="matchup-flat-pace" style="font-size: 0.55rem; color: var(--overlay-primary);">Flat eq ${formatPace(flatEquivalentPace)} /km</div>
                </div>
            </div>
        `;
    });

    let elevationHtml = '';
    if (elevations) {
        elevationHtml = generateElevationSvg(elevations);
    } else {
        elevationHtml = `
            <div style="font-size: 0.6rem; color: var(--overlay-text-muted); margin-top: 0.4rem; font-style: italic;" class="elev-loading">
                Loading elevation profile...
            </div>
        `;
    }
    
    return `
        <div class="detail-card-header matchup-card-header" style="border-bottom: 1px solid var(--overlay-border); padding-bottom: 0.3rem; margin-bottom: 0.4rem; display: flex; flex-direction: column; gap: 0.1rem;">
            <div class="matchup-header-summary">
                <div class="overlay-title" style="font-size: 0.85rem; font-weight: 700; color: var(--overlay-primary); margin-bottom: 0.1rem;">${meta.name} Matchups</div>
                <div style="font-size: 0.7rem; font-weight: 600; color: var(--overlay-text-secondary);">
                    ${meta.dist} • Difficulty: ${meta.rating}/5
                </div>
            </div>
            <div class="matchup-header-details">
                <div class="matchup-leg-description" style="font-size: 0.65rem; font-weight: 400; color: var(--overlay-text-muted); line-height: 1.3; margin-top: 0.2rem;">
                    ${meta.desc}
                </div>
                ${elevationHtml}
            </div>
        </div>
        <div class="leg-runner-heading" style="font-weight: 700; margin-bottom: 0.3rem; font-size: 0.6rem; text-transform: uppercase; color: var(--overlay-text-secondary); letter-spacing: 0.05em;">
            Leg Runner Matchup
        </div>
        <div class="runner-matchup">
            ${rowsHtml}
        </div>
    `;
}

// Compute cumulative standings up to the selected leg
function renderLeaderboard() {
    const container = document.getElementById('standings-container');
    container.innerHTML = '';
    
    // Initialize cumulative trackers
    const teams = {
        'HALIFAX OLD HAMMERS': { name: "Halifax Old Hammers", time: 0, class: 'hammers' },
        'TORONTO HARRIERS MASTERS TEAM': { name: "Toronto Harriers Masters", time: 0, class: 'harriers' },
        'CB ROAD RUNNERS MASTERS': { name: "CB Road Runners Masters", time: 0, class: 'roadrunners' }
    };
    
    // Sum times up to currently selected leg
    for (let i = 0; i <= selectedLegIndex; i++) {
        const leg = resultsData[i];
        if (leg && leg.results) {
            leg.results.forEach(row => {
                if (teams[row.teamKey]) {
                    teams[row.teamKey].time += timeToSeconds(row.gunTime);
                }
            });
        }
    }
    
    // Sort teams by cumulative time
    const sortedTeams = Object.values(teams).sort((a, b) => a.time - b.time);
    const leaderTime = sortedTeams[0].time;
    
    sortedTeams.forEach((t, index) => {
        const card = document.createElement('div');
        card.className = `team-card ${t.class}`;
        
        const gapSecs = t.time - leaderTime;
        const gapStr = gapSecs === 0 ? 'Leader' : `+${secondsToTime(gapSecs)}`;
        const gapClass = gapSecs === 0 ? 'negative' : 'positive';
        
        card.innerHTML = `
            <div class="team-card-header">
                <div>
                    <span class="team-rank">#${index + 1}</span>
                    <span class="team-name" style="margin-left: 0.5rem;">${t.name}</span>
                </div>
                <span class="team-gap ${gapClass}">${gapStr}</span>
            </div>
            <div class="team-time" style="margin-top: 0.25rem;">
                ${secondsToTime(t.time)}
            </div>
        `;
        container.appendChild(card);
    });
}

// Playback simulation controller
function togglePlayback() {
    const playBtn = document.getElementById('playback-toggle');
    if (isPlaying) {
        clearInterval(playbackInterval);
        playBtn.innerText = '▶';
        isPlaying = false;
    } else {
        playBtn.innerText = '⏸';
        isPlaying = true;
        
        // If at the end, restart from Leg 1
        if (selectedLegIndex === 16) {
            selectLeg(0, true);
        }
        
        playbackInterval = setInterval(() => {
            if (selectedLegIndex < 16) {
                selectLeg(selectedLegIndex + 1, true);
            } else {
                clearInterval(playbackInterval);
                playBtn.innerText = '▶';
                isPlaying = false;
            }
        }, 3000); // Progress every 3 seconds
    }
}

// Run init on page load
window.addEventListener('DOMContentLoaded', init);
