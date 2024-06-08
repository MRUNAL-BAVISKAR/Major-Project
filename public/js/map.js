mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: [79.0882, 21.1458], // starting position [lng, lat]
    zoom: 9 // starting zoom
});