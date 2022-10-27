import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
const Game = () => {
    const auth = getAuth();
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (loading) {
            return;
        }
        if (!user) {
            return navigate("/");
        }
    }, [user, loading, navigate]);

    return (
        <div>
            Game
            <Button onClick={() => signOut(auth)} variant='contained'>
                Logout
            </Button>
        </div>
    );
};

export default Game;
