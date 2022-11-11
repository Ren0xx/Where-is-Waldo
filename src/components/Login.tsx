import React, { useState, useEffect } from "react";
import { Container, Snackbar, Alert } from "@mui/material";

import LoginForm from "../components/Login_Form";

import { useNavigate } from "react-router-dom";
import { app } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
    const auth = getAuth(app);
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        const keyDownHandler = (e: any) => {
            if (e.key === "Enter") {
                handleLogin(login, password);
            }
        };
        document.addEventListener("keydown", keyDownHandler);

        return () => {
            document.removeEventListener("keydown", keyDownHandler);
        };
    });
    useEffect(() => {
        if (loading) {
            return;
        }
        if (user) navigate("/playground");
    }, [user, loading, navigate]);

    const handleLogin = (login: string, password: string) => {
        signInWithEmailAndPassword(auth, login, password)
            .then(() => {
                navigate("/playground");
            })
            .catch((error) => {
                setIsOpen(true);
                setPassword("");
            });
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <Container
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mb: 5,
                height: "100vh",
                backgroundColor: "#b7deb8",
            }}>
            <LoginForm
                login={login}
                password={password}
                handleLogin={handleLogin}
                setLogin={setLogin}
                setPassword={setPassword}
            />
            <Snackbar open={isOpen} onClose={handleClose}>
                <Alert severity='error' sx={{ width: "100%" }}>
                    Wrong password, please try again
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Login;
