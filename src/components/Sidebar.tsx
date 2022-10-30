import "../styles/style.css";
import Button from "@mui/material/Button";
import { getAuth, signOut } from "firebase/auth";
import { Typography } from "@mui/material";
const Sidebar = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    return (
        <div className='sidebar'>
            <Typography variant='h4'>Welcome</Typography>
            {user ? user.email : "anonymous"}
            <Button
                sx={{ position: "fixed", top: 4, right: 4 }}
                onClick={() => signOut(auth)}
                variant='contained'>
                Logout
            </Button>
        </div>
    );
};

export default Sidebar;
