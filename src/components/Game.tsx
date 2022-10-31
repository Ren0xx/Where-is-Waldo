import "../styles/style.css";
import { useMousePosition } from "../components/position";
import { Container } from "@mui/material";
import Circle from "../components/Circle";
import photo from "../media/photo.jpg";
const Game = () => {
    const localPosition = useMousePosition().localPosition;
    const globalPosition = useMousePosition().globalPosition;
    return (
        <Container>
            <div>
                x:{localPosition.x}
                <br />
                y:{localPosition.y}
            </div>
            <br />
            <div>
                x:{globalPosition.x}
                <br />
                y:{globalPosition.y}
            </div>
            <img src={photo} className='backgroundImage' alt='...' />
            <Circle x={globalPosition.x} y={globalPosition.y} />
        </Container>
    );
};

export default Game;
