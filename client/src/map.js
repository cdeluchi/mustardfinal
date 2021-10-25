import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl";

mapboxgl.accessToken =
    "pk.eyJ1IjoiY2RlbHVjaGkiLCJhIjoiY2t2NDNvYmp5MDluYTJubHd3Znl3MnB5bSJ9.d8I2mEIf8PP27UPD2XidZg";

export default function App() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(13.4);
    const [lat, setLat] = useState(52.5);
    const [zoom, setZoom] = useState(9);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [lng, lat],
            zoom: zoom,
        });
    });

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on("move", () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    });

    return (
        <div>
            {/* <div className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div> */}
            <div ref={mapContainer} className="map-container" />
        </div>
    );
}
