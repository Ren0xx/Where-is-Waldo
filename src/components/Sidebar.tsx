import "../styles/style.css";
import { useState } from "react";
import Button from "@mui/material/Button";
import { getAuth, signOut, User as FirebaseUser } from "firebase/auth";
import { Typography, Card, Checkbox } from "@mui/material";
import Stopwatch from "./playground/Stopwatch";
import Item from "./playground/Item";
type Character = {
    name: string;
    src: string;
    found: boolean;
    x: number;
    y: number;
};
type CurrentUserProps = {
    currentUser: FirebaseUser | null;
    running: boolean;
    toFind: Character[];
    setRunning: () => void;
};
const Sidebar = (props: CurrentUserProps) => {
    const auth = getAuth();
    const user = props.currentUser;
    // const userId = user?.uid;
    return (
        <div className='sidebar'>
            <Typography variant='h3' color='#1b5e20'>
                Welcome
            </Typography>
            {user ? user.email : "anonymous"}

            <Card
                sx={{
                    display: "flex",
                    gap: "2rem",
                    backgroundColor: "#212121",
                    color: "#fafafa",
                    padding: "6px",
                }}>
                <Typography variant='h5'>Time passed:</Typography>
                <Typography variant='h5'>
                    <Stopwatch running={props.running} />
                </Typography>
            </Card>
            <p>Your task is to find 5 characters and 5 items</p>
            {props.toFind.map((obj) => {
                return (
                    <div key={obj.name}>
                        {obj.name} <Checkbox checked={obj.found} />
                    </div>
                );
            })}
            <Button
                sx={{ position: "fixed", top: 4, right: 4, zIndex: 1000 }}
                onClick={() => signOut(auth)}
                variant='contained'>
                Logout
            </Button>
        </div>
    );
};

export default Sidebar;
