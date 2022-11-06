import "../../styles/style.css";
import { useState, useEffect } from "react";
import { useMousePosition } from "../../components/playground/position";

import { Container } from "@mui/material";
import Circle from "../../components/playground/Circle";
import background from "../../media/background.png";
import ChoiceMenu from "./ChoiceMenu";
import { User as FirebaseUser } from "firebase/auth";

type CurrentUserProps = {
    currentUser: FirebaseUser | null;
};
const Game = (props: CurrentUserProps) => {




    const localPosition = useMousePosition().localPosition;
    //for the backend

    const globalPosition = useMousePosition().globalPosition;
    const visibility = useMousePosition().visible;

    const [isOpen, setIsOpen] = useState<boolean>(false);

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
                x:{localPosition.x}
                <br />
                y:{localPosition.y}
            </div> */}
            {/* <br />
            <div>
                x:{globalPosition.x}
                <br />
                y:{globalPosition.y}
            </div>  */}
            <img
                id='background'
                src={background}
                className='backgroundImage'
                alt='...'
            />
            <Circle
                x={globalPosition.x}
                y={globalPosition.y}
                visible={visibility}
            />
            <ChoiceMenu isOpen={isOpen} setIsOpen={setIsOpen} x={localPosition.x} y={localPosition.y}/>
        </Container>
    );
};

export default Game;
