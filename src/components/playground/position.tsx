import { useState, useEffect } from "react";
export const useMousePosition = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const [position, setPosition] = useState<{
        x: number;
        y: number;
    }>({
        x: 0,
        y: 0,
    });

    useEffect(() => {
        const setFromEvent = (e: any) => {
            if (e.target.id !== "circle" && e.target.id === "background") {
                setPosition({
                    x:
                        e.clientX -
                        e.target.getBoundingClientRect().left.toFixed(0),
                    y:
                        e.clientY -
                        e.target.getBoundingClientRect().top.toFixed(0),
                });
                setVisible(true);
            }
            if (e.target.id === "circle") {
                setVisible(false);
                setPosition({ x: 0, y: 0 });
            }
        };
        window.addEventListener("click", setFromEvent);

        return () => {
            window.removeEventListener("click", setFromEvent);
        };
    }, []);
    return {
        localPosition: position,
        visible: visible,
    };
};
