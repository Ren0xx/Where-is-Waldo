import React from "react";
import "../styles/style.css";
import { Box } from "@mui/material";

type Coordinates = {
    x: number;
    y: number;
};
const Circle = (props: Coordinates) => {
    const { x, y } = props;
    return (
        <Box
            sx={{
                borderRadius: "50%",
                position: "fixed",
                top: y - 50,
                left: x - 50,
                height: "100px",
                width: "100px",
                border: "2px solid blue",
            }}
            className='circle'
            id='circle'></Box>
    );
};

export default Circle;
