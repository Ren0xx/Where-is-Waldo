import React, { useEffect } from "react";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Game from "./Game";
import "../styles/style.css";
const Main = () => {
    const auth = getAuth();
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
            <Sidebar />
            <Game />
        </main>
    );
};

export default Main;
