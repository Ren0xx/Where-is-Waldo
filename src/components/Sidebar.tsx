import "../styles/style.css";
import Button from "@mui/material/Button";
import { getAuth, signOut } from "firebase/auth";
import { Typography, Card, Avatar, Badge, CardHeader } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import Stopwatch from "./playground/Stopwatch";
import { Link } from "react-router-dom";

type Character = {
    name: string;
    src: string;
    found: boolean;
    x: number;
    y: number;
};
type CurrentUserProps = {
    running: boolean;
    toFind: Character[];
    time: number;
    setTime: (time: number) => void;
};
const Sidebar = (props: CurrentUserProps) => {
    const auth = getAuth();
    return (
        <div className='sidebar'>
            <Typography variant='h3' color='#1b5e20'>
                Welcome
            </Typography>
            <br />

            <Card
                sx={{
                    display: "flex",
                    gap: "2rem",
                    backgroundColor: "#2e7d32",
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
                color='success'
                variant='contained'>
                Logout
            </Button>
            <Button
                variant='contained'
                color='success'
                component={Link}
                to={"/leaderboard"}>
                Go to Leaderboard
            </Button>
        </div>
    );
};

export default Sidebar;
