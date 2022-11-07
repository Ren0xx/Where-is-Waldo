import "../styles/style.css";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { getAuth, signOut, User as FirebaseUser } from "firebase/auth";
import { Typography } from "@mui/material";
import Stopwatch from "./playground/Stopwatch";
type CurrentUserProps = {
    currentUser: FirebaseUser | null;
};
const Sidebar = (props: CurrentUserProps) => {
    const [running, setRunning] = useState<boolean>(true);

    const auth = getAuth();
    const user = props.currentUser;
    const userId = user?.uid;
    return (
        <div className='sidebar'>
            <Typography variant='h4'>Welcome</Typography>
            {user ? user.email : "anonymous"}
            <p>{userId}</p>
            
            <h2>Time passed:</h2>
            <Stopwatch running={running} />
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
