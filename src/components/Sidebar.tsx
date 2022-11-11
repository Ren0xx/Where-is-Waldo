import "../styles/style.css";
import Button from "@mui/material/Button";
import { getAuth, signOut, User as FirebaseUser } from "firebase/auth";
import { Typography, Card, Avatar, Badge, CardHeader } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import Stopwatch from "./playground/Stopwatch";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "../firebaseConfig";
import { useEffect, useState } from "react";

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
    bestTime: string;
    setBestTime: (time: string) => void;
    setTime: (time: number) => void;
};
const Sidebar = (props: CurrentUserProps) => {
    const auth = getAuth();
    const user = props.currentUser;
    return (
        <div className='sidebar'>
            <Typography variant='h3' color='#1b5e20'>
                Welcome
            </Typography>
            {user ? user.email : "anonymous"}
            <br />

            <Card
                sx={{
                    display: "flex",
                    gap: "2rem",
                    backgroundColor: "#212121",
                    color: "#fafafa",
                    padding: "6px",
                    flexDirection: "column",
                    alignItems: "center",
                }}>
                <Typography variant='h5'>Time passed:</Typography>
                <Typography variant='h5'>
                    <Stopwatch
                        time={props.time}
                        setTime={props.setTime}
                        running={props.running}
                    />
                </Typography>
                <Typography>
                    Your best score yet was: <br />
                    {props.bestTime}
                </Typography>
            </Card>
            <Card
                className='justify-content-center'
                variant='outlined'
                sx={{ backgroundColor: "#fff" }}>
                <CardHeader title='Find 5 characters and 5 items'></CardHeader>
                <hr />
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
                                <Typography variant='body1'>
                                    {obj.name}
                                </Typography>
                            </div>
                        );
                    })}
                </div>
            </Card>
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
