// import { useEffect, useState } from "react";
export default function EventsModal(handlerClose) {
    return (
        <>
            <div className="modal">
                <h1>Meditation Twin Hearts</h1>
                <img className="img-modal" alt="pordosol" src="/modalimg.png" />
                <br />
                <h2 className="text-modal">
                    Meditation is one of the most beneficial acts during the
                    full moon <br /> and one of the potent methods of service to
                    humanity and to mother earth.
                    <br />
                    Master Choa Kok Sui
                </h2>
                <br />
                <h2 className="text-modal">
                    Fri, Oct 29 , 2:45 AM + 166 more events
                </h2>
                <br />
                <p>Also Online- Zoom • Berlin</p>
                <br />
                <p>Free</p>
                <p>601 followers</p>
                <br />

                <button
                    className="btn-close"
                    onClick={handlerClose}
                    // onClick={handlerClose}
                >
                    close
                </button>
            </div>
        </>
    );
}
