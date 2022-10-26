import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import InputAdornment from "@mui/material/InputAdornment";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import KeyIcon from "@mui/icons-material/Key";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import { app } from "../firebaseConfig";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";

const Login = () => {
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const auth = getAuth(app);

    const handleLogin = (login: string, password: string) => {
        signInWithEmailAndPassword(auth, login, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
            });
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
            <Stack
                spacing={5}
                direction='column'
                component='form'
                autoComplete='off'
                sx={{
                    backgroundColor: "#fff",
                    padding: "3rem",
                    width: "300px",
                    height: "auto",
                    borderRadius: "9px",
                }}>
                <TextField
                    label='Email'
                    id='outlined'
                    required
                    placeholder='Type your login'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <MailOutlineIcon />
                            </InputAdornment>
                        ),
                    }}
                    onChange={(event: any) => {
                        setLogin(event.target.value);
                    }}
                />
                <TextField
                    id='outlined-password-input'
                    label='Password'
                    required
                    placeholder='Type your password'
                    type='password'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <KeyIcon />
                            </InputAdornment>
                        ),
                    }}
                    onChange={(event: any) => {
                        setPassword(event.target.value);
                    }}
                />
                <Button
                    variant='contained'
                    size='large'
                    sx={{ borderRadius: "15px", backgroundColor: "#7dcce5" }}
                    onClick={() => handleLogin(login, password)}>
                    Login
                </Button>
            </Stack>
        </Container>
    );
};

export default Login;
