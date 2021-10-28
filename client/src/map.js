// import * as React from "react";
import { useState } from "react";
// import { render } from "react-dom";
// import { Marker } from "mapbox-gl";
import ReactMapGL, { Marker } from "react-map-gl";
// import MapGL from "react-map-gl";
// import Marker from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN =
    "pk.eyJ1IjoiY2RlbHVjaGkiLCJhIjoiY2t2NDNvYmp5MDluYTJubHd3Znl3MnB5bSJ9.d8I2mEIf8PP27UPD2XidZg";

export default function Map() {
    const [viewport, setViewport] = useState({
        width: 720,
        height: 450,
        latitude: 52.515,
        longitude: 13.403,
        zoom: 11,
    });

    // const charlottenburg = new charlottenburg.Marker({
    //     color: "black",
    //     rotation: 45,
    // });
    //     .setLngLat([13.3041, 52.5166])
    //     .addTo(viewport);
    // const mitte = new mitte.Marker({ color: "black", rotation: 45 })
    //     .setLngLat([13.3603, 52.5373])
    //     .addTo(viewport);
    // const kreuzberg = new kreuzberg.Marker({ color: "black", rotation: 45 })
    //     .setLngLat([13.4066, 52.4983])
    //     .addTo(viewport);
    return (
        <div className="map-container-notdefault">
            <ReactMapGL
                {...viewport}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                onViewportChange={setViewport}
                mapboxApiAccessToken={MAPBOX_TOKEN}
            >
                <Marker
                    className="marker-container-notdefault"
                    latitude={52.5166}
                    longitude={13.3041}
                    offsetLeft={-20}
                    offsetTop={-10}
                >
                    <div>
                        <img className="pinImg" src={"/pin.png"} alt="Logo" />
                    </div>
                </Marker>
                <Marker
                    className="marker-container-notdefault"
                    latitude={52.5373}
                    longitude={13.3603}
                    offsetLeft={-20}
                    offsetTop={-10}
                >
                    <div>
                        <img className="pinImg" src={"/pin.png"} alt="Logo" />
                    </div>
                </Marker>
                <Marker
                    className="marker-container-notdefault"
                    latitude={52.4983}
                    longitude={13.4066}
                    offsetLeft={-20}
                    offsetTop={-10}
                >
                    <div>
                        <img className="pinImg" src={"/pin.png"} alt="Logo" />
                    </div>
                </Marker>
            </ReactMapGL>
        </div>
    );
}
