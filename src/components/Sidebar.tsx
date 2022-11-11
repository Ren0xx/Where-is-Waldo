import "../styles/style.css";
import { useState } from "react";
import Button from "@mui/material/Button";
import { getAuth, signOut, User as FirebaseUser } from "firebase/auth";
import { Typography, Card, Avatar, Badge } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import Stopwatch from "./playground/Stopwatch";
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
    time: number;
    setTime: (time: number) => void;
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
                    <Stopwatch time={props.time} setTime={props.setTime}running={props.running} />
                </Typography>
            </Card>
            <Typography variant='subtitle2'>
                Your task is to find 5 characters and 5 items
            </Typography>
            <div className='itemsList'>
                {props.toFind.map((obj) => {
                    return (
                        <div key={obj.name} className='item'>
                            <Badge
                                color='success'
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "right",
                                }}
                                invisible={!obj.found}
                                badgeContent={<CheckIcon />}>
                                <Avatar src={obj.src} alt='..' />
                            </Badge>
                            <Typography variant='body1'>{obj.name}</Typography>
                        </div>
                    );
                })}
            </div>
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
