import { useRef, useEffect, useState } from "react";
import { Component } from "react";
// import { BrowserRouter, Route } from "react-router-dom";
import mapboxgl from "!mapbox-gl";

const data = [
    {
        location: "How to Meditate Even When You are Busy'",
        city: "Mitte",
        state: "Berlin",
        coordinates: [52.5373, 13.3603],
    },
    {
        location: "The Impact of GMCKS Teachings on Quality of Life",
        city: "Kreuzberg",
        state: "Berlin",
        coordinates: [52.4983, 13.4066],
    },
    {
        location: "Getting Ready for the Wesak Meditation",
        city: "Charlottenburg",
        state: "Berlin",
        coordinates: [52.5166, 13.3041],
    },
];

mapboxgl.accessToken =
    "pk.eyJ1IjoiY2RlbHVjaGkiLCJhIjoiY2t2NDNvYmp5MDluYTJubHd3Znl3MnB5bSJ9.d8I2mEIf8PP27UPD2XidZg";

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: -74,
            lat: 40.7128,
            zoom: 12,
        };
    }

    componentDidMount() {
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: "mapbox://styles/shiy/ckjg4xi1r158y19maqdzjkqjx",
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom,
        });

        data.forEach((location) => {
            console.log(location);
            var marker = new mapboxgl.Marker()
                .setLngLat(location.coordinates)
                .setPopup(
                    new mapboxgl.Popup({ offset: 30 }).setHTML(
                        "<h4>" + location.city + "</h4>" + location.location
                    )
                )
                .addTo(map);
        });
    }
    render() {
        return (
            <div>
                <div
                    ref={(el) => (this.mapContainer = el)}
                    style={{ width: "300px", height: "300px" }}
                />
            </div>
        );
    }
}
