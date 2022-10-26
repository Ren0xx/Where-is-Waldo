import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import InputAdornment from "@mui/material/InputAdornment";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import KeyIcon from "@mui/icons-material/Key";

import { app } from "../firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Login = () => {
    const auth = getAuth(app);
    return (
        <Container
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mb: 5,
                height: "100vh",
            }}>
            <Box
                component='form'
                autoComplete='off'
                sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                <TextField
                    label='Email'
                    id='outlined'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <MailOutlineIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    id='outlined-password-input'
                    label='Password'
                    type='password'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <KeyIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
        </Container>
    );
};

export default Login;
