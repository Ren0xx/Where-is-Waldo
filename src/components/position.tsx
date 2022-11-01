import { useState, useEffect } from "react";
export const useMousePosition = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const [localPosition, setLocalPosition] = useState<{
        x: number;
        y: number;
    }>({
        x: 0,
        y: 0,
    });
    const [globalPosition, setGlobalPosition] = useState<{
        x: number;
        y: number;
    }>({
        x: 0,
        y: 0,
    });

    useEffect(() => {
        const setFromEvent = (e: any) => {
            if (e.target.id !== "circle" && e.target.id === "background") {
                setLocalPosition({
                    x:
                        e.clientX -
                        e.target.getBoundingClientRect().left.toFixed(0),
                    y:
                        e.clientY -
                        e.target.getBoundingClientRect().top.toFixed(0),
                });
                setGlobalPosition({
                    x: e.clientX,
                    y: e.clientY,
                });
            }
            setVisible(true);
        };
        window.addEventListener("click", setFromEvent);

        return () => {
            window.removeEventListener("click", setFromEvent);
        };
    }, []);
    return {
        localPosition,
        globalPosition,
        visible: visible,
    };
};
