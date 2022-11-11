import React from "react";
import {
    InputAdornment,
    Button,
    Stack,
    Typography,
    TextField,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import KeyIcon from "@mui/icons-material/Key";
import { Link } from "react-router-dom";

type LoginProps = {
    login: string;
    password: string;
    setLogin: (event: any) => void;
    setPassword: (event: any) => void;
    handleLogin: (login: string, password: string) => void;
};

const LoginForm = (props: LoginProps) => {
    return (
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
                value={props.login}
                placeholder='Type your login'
                InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                            <MailOutlineIcon />
                        </InputAdornment>
                    ),
                }}
                onChange={(event: any) => {
                    props.setLogin(event.target.value);
                }}
            />
            <TextField
                id='outlined-password-input'
                label='Password'
                required
                placeholder='Type your password'
                type='password'
                value={props.password}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                            <KeyIcon />
                        </InputAdornment>
                    ),
                }}
                onChange={(event: any) => {
                    props.setPassword(event.target.value);
                }}
            />
            <Button
                variant='contained'
                size='large'
                disabled={
                    props.login !== "" && props.password !== "" ? false : true
                }
                sx={{ borderRadius: "15px", backgroundColor: "#4caf50" }}
                onClick={() => props.handleLogin(props.login, props.password)}>
                Login
            </Button>

            <p>Don't have an account yet?</p>

            <Link to='/register'>
                <Typography sx={{ color: "black", textDecoration: "none" }}>
                    Create an account
                </Typography>
            </Link>
        </Stack>
    );
};

export default LoginForm;
