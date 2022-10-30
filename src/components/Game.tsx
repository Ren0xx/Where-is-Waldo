import "../styles/style.css";
import { useMousePosition } from "../components/position";
import { Container } from "@mui/material";
import Circle from "../components/Circle";
import photo from "../media/photo.jpg";
const Game = () => {
    const position = useMousePosition();
    return (
        <Container>
            <div>
                x:{position.x}
                <br />
                y:{position.y}
            </div>
            <img src={photo} className="backgroundImage"alt='...' />
            <Circle />
        </Container>
    );
};

export default Game;
