import React from "react";
import "../../styles/style.css";
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
                top: y - 25,
                left: x - 25,
                height: "50px",
                width: "50px",
                visibility: visible ? "visible" : "hidden",
            }}
            className='circle'
            id='circle'></Box>
    );
};

export default Circle;
