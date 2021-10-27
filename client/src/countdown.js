import { useEffect, useState } from "react";
import { getRemainingTimeUntilMsTimestamp } from "./countdownTimer";
// import Head from "next/head";
// import CountDownTimer from "@inlightmedia/react-countdown-timer";

const dates = {
    day: "2021-10-28",
    time: "17:00:20",
};
const defaultRemainingTime = {
    seconds: "00",
    minutes: "00",
    hours: "00",
    days: "00",
};

const Countdown = ({ countdownTimestampMs }) => {
    const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

    useEffect(() => {
        const intervalId = setInterval(() => {
            updateRemainingTime(countdownTimestampMs);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [countdownTimestampMs]);

    function updateRemainingTime(countdown) {
        setRemainingTime(getRemainingTimeUntilMsTimestamp(countdown));
    }

    return (
        <div className="clock">
            <div className="container">
                {/* <h2>next event in</h2> */}
                {/* <span className="days">{remainingTime.days}</span>
                <span className="days-text">days</span> */}
                {/* <span className="days-text">:</span> */}
                <span className="textclock">{remainingTime.hours}</span>
                <span className="textclock">hrs</span>
                {/* <span className="hours-text">:</span> */}
                <span className="textclock">{remainingTime.minutes}</span>
                <span className="textclock">min</span>
                {/* <span className="minutes-text">:</span> */}

                <span className="textclock">{remainingTime.seconds}</span>
                <span className="textclock">sec</span>
            </div>
        </div>
    );
};
export default Countdown;

// connect the event to clock
//when the event is done, another event  take place and the old one is replace
