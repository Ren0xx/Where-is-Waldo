import "../styles/style.css";
import { useState, useEffect } from "react";
import { useMousePosition } from "../components/position";

import { Container } from "@mui/material";
import Circle from "../components/Circle";
import photo from "../media/photo.jpg";
import ChoiceMenu from "../components/ChoiceMenu";
const Game = () => {
    //for the backend
    const localPosition = useMousePosition().localPosition;

    const globalPosition = useMousePosition().globalPosition;
    const visibility = useMousePosition().visible;
    // const isOpen = useMousePosition().isDrawerOpen;

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const closeDrawer = () => {
        setIsOpen(false);
        console.log("closeDrawer");
    };
    useEffect(() => {
        const openDrawer = () => {
            setIsOpen(true);
        };
        const background = document.getElementById("background");
        if (background) {
            background.addEventListener("click", openDrawer);
        }
        if (background) {
            return () => {
                background.removeEventListener("click", openDrawer);
            };
        }
    }, [isOpen]);
    return (
        <Container>
            {/* <div>
                x:{localPosition.x}l
                <br />
                y:{localPosition.y}
            </div>
            <br />
            <div>
                x:{globalPosition.x}
                <br />
                y:{globalPosition.y}
            </div> */}
            <img
                id='background'
                src={photo}
                className='backgroundImage'
                alt='...'
            />
            <Circle
                x={globalPosition.x}
                y={globalPosition.y}
                visible={visibility}
            />
            <ChoiceMenu isOpen={isOpen} closeDrawer={closeDrawer} />
        </Container>
    );
};

export default Game;
