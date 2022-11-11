import { useEffect } from "react";
import "../../styles/style.css";
type TimeProps = {
    running: boolean;
    time: number;
    setTime: (time: any) => void;
};
const Stopwatch = (props: TimeProps) => {
    const { running, time, setTime } = props;
    useEffect(() => {
        let interval: any = null;
        if (running) {
            interval = setInterval(() => {
                setTime((prevTime: number) => prevTime + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [running, time, setTime]);
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
