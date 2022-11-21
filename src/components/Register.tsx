import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { app, firestore } from "../firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import {
    ArrowBack,
    MailOutline,
    Key,
    AccountCircle,
} from "@mui/icons-material";
import {
    Alert,
    TextField,
    Container,
    Button,
    Stack,
    Snackbar,
    InputAdornment,
} from "@mui/material";

const Register = () => {
    const auth = getAuth(app);

    const [login, setLogin] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");

    const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
    const [isErrorOpen, setIsErrorOpen] = useState<boolean>(false);
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    const createCollectionForUser = async (
        id: string,
        email: string,
        login: string
    ) => {
        await setDoc(doc(firestore, "users", id), {
            time: 0,
            email: email,
            username: login,
        });
    };

    const handleClose = () => {
        setIsErrorOpen(false);
    };

    const handleUserRegistration = (
        login: string,
        password: string,
        username: string
    ) => {
        createUserWithEmailAndPassword(auth, login, password)
            .then((userCredential) => {
                createCollectionForUser(
                    userCredential.user.uid,
                    userCredential.user.email || "",
                    username
                );
            })
            .catch(() => {
                setIsErrorOpen(true);
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
                backgroundColor: "#b7deb8",
                position: "relative",
            }}>
            <Button
                sx={{
                    position: "absolute",
                    top: "0px",
                    left: "0px",
                    color: "#4caf50",
                }}
                startIcon={<ArrowBack />}
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
                    label='Login'
                    id='outlined'
                    required
                    placeholder='Type your login'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <AccountCircle />
                            </InputAdornment>
                        ),
                    }}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setLogin(event.target.value);
                    }}
                />
                <TextField
                    label='Email'
                    id='outlined'
                    required
                    placeholder='Type your email'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <MailOutline />
                            </InputAdornment>
                        ),
                    }}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setEmail(event.target.value);
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
                                <Key />
                            </InputAdornment>
                        ),
                    }}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
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
                                <Key />
                            </InputAdornment>
                        ),
                    }}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setPassword2(event.target.value);
                    }}
                />
                <Button
                    variant='contained'
                    size='large'
                    color='success'
                    disabled={
                        password !== password2 || !isPasswordValid
                            ? true
                            : false
                    }
                    sx={{ borderRadius: "15px" }}
                    onClick={() =>
                        handleUserRegistration(email, password, login)
                    }>
                    Create an account
                </Button>
            </Stack>
            <Snackbar open={isErrorOpen} onClose={handleClose}>
                <Alert severity='error' sx={{ width: "100%" }}>
                    This email is already taken or incorrect.
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Register;
