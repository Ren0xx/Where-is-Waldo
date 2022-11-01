import React from "react";
import "../styles/style.css";
import { Box } from "@mui/material";

type Coordinates = {
    x: number;
    y: number;
    visible: boolean;
};
const Circle = (props: Coordinates) => {
    const { x, y, visible } = props;
    return (
        <Box
            sx={{
                borderRadius: "50%",
                position: "absolute",
                top: y - 50,
                left: x - 50,
                height: "100px",
                width: "100px",
                border: "2px solid blue",
                visibility:  visible ? "visible" : "hidden",
            }}
            className='circle'
            id='circle'></Box>
    );
};

export default Circle;
