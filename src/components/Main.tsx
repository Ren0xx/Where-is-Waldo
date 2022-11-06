import React, { useEffect } from "react";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Game from "./playground/Game";
import "../styles/style.css";

const Main = () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    const [user, loading] = useAuthState(auth);
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
        <main className='layout'>
            <Sidebar currentUser={currentUser} />
            <Game currentUser={currentUser} /> 
        </main>
    );
};

export default Main;
