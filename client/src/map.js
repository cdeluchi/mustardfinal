import { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl";
// import geoJson from "./data/data.json";

mapboxgl.accessToken =
    "pk.eyJ1IjoiY2RlbHVjaGkiLCJhIjoiY2t2NDNvYmp5MDluYTJubHd3Znl3MnB5bSJ9.d8I2mEIf8PP27UPD2XidZg";

export default function App() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(13.4);
    const [lat, setLat] = useState(52.5);
    const [zoom, setZoom] = useState(9);
    // const [popup, setPopup] = useState;

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [lng, lat],
            zoom: zoom,
        });
        const lngLat = [13.4, 52.5];
        // marker creation and addition to the map
        const marker = new mapboxgl.Marker()
            .setLngLat(lngLat)
            .addTo(map.current);
    });

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on("move", () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
            // setPopup(new mapboxgl.Popup().setHTML("<h1>HelloWorld</hq>"));
            // setPopup(new mapboxgl.Popup().setHTML(“<h1>Hello World!</h1>)))
        });
    });

    return (
        <div>
            <div ref={mapContainer} className="map-container-notdefault" />
        </div>
    );
}
