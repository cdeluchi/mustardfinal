import { useEffect, useState } from "react";
import { getRemainingTimeUntilMsTimestamp } from "./countdownTimer";

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
                {/* <span className="days-text">days</span>
                <span className="days">{remainingTime.days}</span> */}
                {/* <span className="days-text">:</span> */}
                <span className="hours">{remainingTime.hours}</span>
                <span className="hours-text">hrs</span>
                {/* <span className="hours-text">:</span> */}
                <span className="minutes">{remainingTime.minutes}</span>
                <span className="hours-text">min</span>
                {/* <span className="minutes-text">:</span> */}

                <span className="seconds">{remainingTime.seconds}</span>
                <span className="seconds-text">sec</span>
            </div>
        </div>
    );
};
export default Countdown;
