import { useState, useEffect } from "react";
export const useMousePosition = () => {
    const [position, setPosition] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    });
    useEffect(() => {
        const setFromEvent = (e: any) =>
            setPosition({
                x: e.clientX - e.target.offsetLeft,
                y: e.clientY - e.target.offsetTop,
            });
        window.addEventListener("click", setFromEvent);

        return () => {
            window.removeEventListener("click", setFromEvent);
        };
    }, []);
    return position;
};
