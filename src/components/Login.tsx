import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import LoginForm from "../components/Login_Form";

import { useNavigate} from "react-router-dom";
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
            .then((userCredential) => {
                // const user = userCredential.user;
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
                backgroundColor: "#d4c9c3",
            }}>
            <LoginForm
                login={login}
                password={password}
                handleLogin={handleLogin}
                setLogin={setLogin}
                setPassword={setPassword}
            />
            {/* <Dialog open={isOpen} onClose={handleClose}>
                <DialogTitle>Wrong password</DialogTitle>
                <Alert sx={{ backgroundColor: "#0bc000" }} severity='error'>
                    Please try one more time.
                </Alert>
            </Dialog> */}
            <Snackbar open={isOpen} onClose={handleClose}>
                <Alert severity='error' sx={{ width: "100%" }}>
                    Wrong password, please try again
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Login;
