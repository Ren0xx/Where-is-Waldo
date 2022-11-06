import { useState } from "react";
import Item from "../playground/Item";
import IMAGES from "./images";
import { app, firestore } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

import { Drawer, List, Button, Box, ListItem, Typography } from "@mui/material";
type DrawerProps = {
    isOpen: boolean;
    setIsOpen: any;
    x: number;
    y: number;
};
const ChoiceMenu = (props: DrawerProps) => {
    const [choice, setChoice] = useState<string>("");
    const toFind = [
        { name: "Waldo", src: IMAGES.waldo },
        { name: "Wilma", src: IMAGES.wilma },
        { name: "Wizard", src: IMAGES.wizard },
        { name: "Woof", src: IMAGES.woofTail },
        { name: "Odlaw", src: IMAGES.odlaw },
        { name: "Bone", src: IMAGES.bone },
        { name: "Binoculars", src: IMAGES.binoculars },
        { name: "Camera", src: IMAGES.camera },
        { name: "Key", src: IMAGES.key },
        { name: "Scroll", src: IMAGES.scroll },
    ];
    const closeDrawer = () => {
        props.setIsOpen(false);
        setChoice("");
    };

    const checkIfHit = (
        x: number,
        y: number,
        originX: number,
        originY: number
    ) => {
        const errorMargin = 40;
        if (
            x > originX - errorMargin &&
            x < originX + errorMargin &&
            y > originY - errorMargin &&
            y < originY + errorMargin
        ) {
            alert(`You found ${choice}`);
            return true;
        }
        alert("Item not found");
        return false;
    };
    const onChoiceSubmit = async (choice: string, x: number, y: number) => {
        const docRef = doc(firestore, "characters", choice);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const [originX, originY] = [
                docSnap.data().position.x,
                docSnap.data().position.y,
            ];
            checkIfHit(x, y, originX, originY);
            console.log(x, y);
        }
    };
    const handleChoice = (choice: string) => {
        setChoice(choice);
    };
    return (
        <Drawer open={props.isOpen} anchor='right'>
            <List sx={{ padding: "25px" }}>
                <ListItem>
                    <Typography variant='h6'>Choose a character</Typography>
                </ListItem>

                {toFind.map((item) => {
                    return (
                        <Item
                            key={item.name}
                            src={item.src}
                            name={item.name}
                            handleChoice={handleChoice}
                        />
                    );
                })}
                <ListItem> Selected: {choice} </ListItem>
                <Box
                    sx={{
                        display: "flex",
                        gap: "0.25rem",
                    }}>
                    <Button
                        disabled={choice !== "" ? false : true}
                        onClick={() => {
                            closeDrawer();
                            onChoiceSubmit(choice, props.x, props.y);
                        }}
                        value={choice}
                        variant='outlined'>
                        Confirm
                    </Button>
                    <Button
                        variant='outlined'
                        color='error'
                        onClick={closeDrawer}>
                        Cancel
                    </Button>
                </Box>
            </List>
        </Drawer>
    );
};

export default ChoiceMenu;
