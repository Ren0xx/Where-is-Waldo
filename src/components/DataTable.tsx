import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
    Button,
} from "@mui/material";

import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

type Player = {
    username: string;
    time: number;
    email: string;
};
type UserData = {
    players: Player[];
};

const DataTable = (props: UserData) => {
    const navigate = useNavigate();
    const { players } = props;
    return (
        <TableContainer component={Paper} sx={{ marginTop: 5 }}>
            <Table aria-label='score-table'>
                <TableHead>
                    <TableRow>
                        <TableCell align='center' colSpan={3}>
                            <Typography variant='h3'>Best Scores</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align='center'>
                            <Typography variant='h5'>Name</Typography>
                        </TableCell>
                        <TableCell align='center'>
                            <Typography variant='h5'>Time&nbsp; (s)</Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {players.map((player) => (
                        <TableRow key={player.email}>
                            <TableCell align='center'>
                                {player.username}
                            </TableCell>
                            <TableCell align='center'>{player.time}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
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
        </TableContainer>
    );
};

export default DataTable;
