import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { app } from "../firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import InputAdornment from "@mui/material/InputAdornment";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import KeyIcon from "@mui/icons-material/Key";

const Register = () => {
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");
    const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const auth = getAuth(app);
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleUserRegistration = (login: string, password: string) => {
        createUserWithEmailAndPassword(auth, login, password)
            .then((userCredential) => {})
            .catch((error) => {
                setIsOpen(true);
            });
    };
    useEffect(() => {
        const reg = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
        const handlePasswordInput = (password: string, password2: string) => {
            setIsPasswordValid(reg.test(password) && reg.test(password2));
        };
        handlePasswordInput(password, password2);
    }, [password, password2]);
    useEffect(() => {
        if (loading) {
            return;
        }
        if (user) navigate("/playground");
    }, [user, loading, navigate]);
    return (
        <Container
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mb: 5,
                height: "100vh",
                backgroundColor: "#d4c9c3",
                position: "relative",
            }}>
            <Button
                sx={{ position: "absolute", top: "0px", left: "0px" }}
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate("/")}>
                Go back
            </Button>
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
                    error={
                        password !== password2 || !isPasswordValid
                            ? true
                            : false
                    }
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
                <TextField
                    id='outlined-password-input'
                    label='Repeat password'
                    required
                    error={
                        password !== password2 || !isPasswordValid
                            ? true
                            : false
                    }
                    helperText={
                        !isPasswordValid
                            ? "Minimum eight characters, at least one letter and one number:"
                            : ""
                    }
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
                        setPassword2(event.target.value);
                    }}
                />
                <Button
                    variant='contained'
                    size='large'
                    disabled={
                        password !== password2 || !isPasswordValid
                            ? true
                            : false
                    }
                    sx={{ borderRadius: "15px", backgroundColor: "#7dcce5" }}
                    onClick={() => handleUserRegistration(login, password)}>
                    Create an account
                </Button>
            </Stack>
            <Snackbar open={isOpen} onClose={handleClose}>
                <Alert severity='error' sx={{ width: "100%" }}>
                    This email is already taken.
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Register;
