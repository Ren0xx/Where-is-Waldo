import "../../styles/style.css";
import { useState, useEffect } from "react";
import { useMousePosition } from "../../components/playground/position";
import Circle from "./Circle";
import CharacterLabel from "./CharacterLabel";
import ChoiceMenu from "./ChoiceMenu";
import background from "../../media/background.png";
import IMAGES from "./images";

type Character = {
    name: string;
    src: string;
    found: boolean;
    x: number;
    y: number;
};

const Game = () => {
    const [toFind, setToFind] = useState<Character[]>([
        { name: "Waldo", src: IMAGES.waldo, found: false, x: 0, y: 0 },
        { name: "Wilma", src: IMAGES.wilma, found: false, x: 0, y: 0 },
        { name: "Wizard", src: IMAGES.wizard, found: false, x: 0, y: 0 },
        { name: "Woof", src: IMAGES.woofTail, found: false, x: 0, y: 0 },
        { name: "Odlaw", src: IMAGES.odlaw, found: false, x: 0, y: 0 },
        { name: "Bone", src: IMAGES.bone, found: false, x: 0, y: 0 },
        {
            name: "Binoculars",
            src: IMAGES.binoculars,
            found: false,
            x: 0,
            y: 0,
        },
        { name: "Camera", src: IMAGES.camera, found: false, x: 0, y: 0 },
        { name: "Key", src: IMAGES.key, found: false, x: 0, y: 0 },
        { name: "Scroll", src: IMAGES.scroll, found: false, x: 0, y: 0 },
    ]);
    const position = useMousePosition().localPosition;
    const visibility = useMousePosition().visible;

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const markFound = (name: string, x: number, y: number) => {
        const newState = toFind.map((obj: Character) => {
            if (obj.name === name) {
                return { ...obj, found: true, x: x, y: y };
            }
            return obj;
        });
        setToFind(newState);
    };

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
                toFind={toFind}
                markFound={markFound}
            />
            {toFind.map((obj) => {
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
