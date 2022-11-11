import { useState } from "react";
import Item from "../playground/Item";
import { firestore } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import "../../";
import {
    Drawer,
    List,
    Button,
    Box,
    ListItem,
    Typography,
    Alert,
    Snackbar,
} from "@mui/material";
type DrawerProps = {
    isOpen: boolean;
    setIsOpen: any;
    x: number;
    y: number;
    toFind: { name: string; src: string; found: boolean }[];
    markFound: (name: string, x: number, y: number) => void;
};
const ChoiceMenu = (props: DrawerProps) => {
    const [choice, setChoice] = useState<string>("");
    const [isSuccessTabOpen, setIsSuccessTabOpen] = useState<boolean>(false);
    const [isFailedTabOpen, setIsFailedTabOpen] = useState<boolean>(false);

    const closeDrawer = () => {
        props.setIsOpen(false);
        setChoice("");
    };
    const handleFailedTabClose = () => {
        setIsFailedTabOpen(false);
    };
    const handleSuccessTabClose = () => {
        setIsSuccessTabOpen(false);
    };
    const onConfirm = async (choice: string, x: number, y: number) => {
        const position = await getCharacterPosition(choice);
        if (checkIfHit(x, y, position.x, position.y)) {
            props.markFound(choice, x, y);
        }
        closeDrawer();
    };
    const checkIfHit = (x: number, y: number, charX: number, charY: number) => {
        const errorMargin = 30;
        if (
            x > charX - errorMargin &&
            x < charX + errorMargin &&
            y > charY - errorMargin &&
            y < charY + errorMargin
        ) {
            setIsSuccessTabOpen(true);
            return true;
        }
        setIsFailedTabOpen(true);
        return false;
    };
    const getCharacterPosition = async (
        choice: string
    ): Promise<{ x: number; y: number }> => {
        const docRef = doc(firestore, "characters", choice);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return {
                x: docSnap.data().position.x,
                y: docSnap.data().position.y,
            };
        }
        return { x: 0, y: 0 };
    };
    const handleChoice = (choice: string) => {
        setChoice(choice);
    };
    return (
        <>
            <Drawer open={props.isOpen} anchor='right'>
                <List sx={{ padding: "25px" }}>
                    <ListItem>
                        <Typography variant='h6'>Choose a character</Typography>
                    </ListItem>

                    {props.toFind.map((item) => {
                        return (
                            <Item
                                key={item.name}
                                src={item.src}
                                name={item.name}
                                handleChoice={handleChoice}
                                found={item.found}
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
                                onConfirm(choice, props.x, props.y);
                            }}
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
            <Snackbar open={isSuccessTabOpen} onClose={handleSuccessTabClose}>
                <Alert severity='success' sx={{ width: "100%" }}>
                    You found something!
                </Alert>
            </Snackbar>
            <Snackbar open={isFailedTabOpen} onClose={handleFailedTabClose}>
                <Alert severity='error' sx={{ width: "100%" }}>
                    Try again!
                </Alert>
            </Snackbar>
        </>
    );
};

export default ChoiceMenu;
