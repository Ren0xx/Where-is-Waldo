import { useState, useEffect } from "react";
import "../../styles/style.css";
type TimeProps = {
    running: boolean;
};
const Stopwatch = (props: TimeProps) => {
    const [time, setTime] = useState(0);
    useEffect(() => {
        let interval: any = null;
        if (props.running) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        } else if (!props.running) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [props.running]);
    return (
        <span className='stopwatch'>
            <span className='numbers'>
                <span>{("0" + Math.floor(time / 60)).slice(-2)}:</span>
                <span>{("0" + Math.floor(time % 60)).slice(-2)}</span>
            </span>
        </span>
    );
};

export default Stopwatch;
