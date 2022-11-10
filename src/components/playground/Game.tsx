import "../../styles/style.css";
import { useState, useEffect } from "react";
import { useMousePosition } from "../../components/playground/position";
import Circle from "./Circle";
import CharacterLabel from "./CharacterLabel";
import ChoiceMenu from "./ChoiceMenu";
import background from "../../media/background.png";

type Character = {
    name: string;
    src: string;
    found: boolean;
    x: number;
    y: number;
};
type GameProps = {
    toFind: Character[];
    markFound: (name: string, x: number, y: number) => void;
};

const Game = (props: GameProps) => {
    const position = useMousePosition().localPosition;
    const visibility = useMousePosition().visible;

    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        const openDrawer = () => {
            setIsOpen(true);
        };
        const background = document.getElementById("background");
        if (background) {
            background.addEventListener("click", openDrawer);

            return () => {
                background.removeEventListener("click", openDrawer);
            };
        }
    }, [isOpen]);
    return (
        <div className='gameContainer'>
            <img
                id='background'
                src={background}
                className='backgroundImage'
                alt='...'
            />
            <Circle x={position.x} y={position.y} visible={visibility} />
            <ChoiceMenu
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                x={position.x}
                y={position.y}
                toFind={props.toFind}
                markFound={props.markFound}
            />
            {props.toFind.map((obj) => {
                return (
                    <CharacterLabel
                        key={obj.name}
                        x={obj.x}
                        y={obj.y}
                        name={obj.name}
                        visible={obj.found}
                    />
                );
            })}
        </div>
    );
};

export default Game;
