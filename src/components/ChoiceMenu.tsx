import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

type Choice = {
    isOpen: boolean;
    closeDrawer: any;
};
const ChoiceMenu = (props: Choice) => {
    return (
        <Drawer open={props.isOpen} anchor='right'>
            <List>
                <ListItem>Hi</ListItem>
                <ListItem>Hi2</ListItem>
                <ListItem>Hi2</ListItem>
                <Button onClick={props.closeDrawer}>Confirm</Button>
            </List>
        </Drawer>
    );
};

export default ChoiceMenu;
