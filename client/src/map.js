import { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import * as parkDate from "./data/data.json";
import GeocoderService from "@mapbox/mapbox-sdk/services/geocoding";

const geocoder = GeocoderService({
    accessToken:
        pk.eyJ1IjoiY2RlbHVjaGkiLCJhIjoiY2t2NTFvMmlkMHR2eDJvbHVrZjJ0cXRpaCJ9
            .Kd6iS1mJ6cCQiWuLmDjcIg,
});

export default function Map() {
    const lngLat = [13.383309, 52.516806];
    const marker = new mapboxgl.Marker().setLngLat(lngLat).addTo(map);
    const [viewport, setViewport] = useState({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [13.383309, 52.516806],
        zoom: 9,
    });
    const [selectedPark, setSelectedPark] = useState(null);
    const query = "Berlin";
    const response = await geocoder.forwardGeocode({ query, limit: 5 }).send();

    useEffect(() => {
        const listener = (e) => {
            if (e.key === "Escape") {
                setSelectedPark(null);
            }
        };
        window.addEventListener("keydown", listener);

        return () => {
            window.removeEventListener("keydown", listener);
        };
    }, []);

    return (
        <div>
            <div id="map">I am a map</div>
        </div>
    );
}
