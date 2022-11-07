import Chip from "@mui/material/Chip";

type label = {
    x: number;
    y: number;
    name: string;
    visible: boolean;
};

const CharacterLabel = (props: label) => {
    const { x, y, name, visible } = props;
    return (
        <Chip
            sx={{
                position: "absolute",
                top: y - 40,
                left: x - 25,
                display: visible ? "block" : "none",
            }}
            color='success'
            size='small'
            label={name}
        />
    );
};

export default CharacterLabel;
