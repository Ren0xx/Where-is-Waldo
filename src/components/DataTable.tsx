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
    const formatTime = (time: number) => {
        const m = Math.floor((time % 3600) / 60)
                .toString()
                .padStart(2, "0"),
            s = Math.floor(time % 60)
                .toString()
                .padStart(2, "0");
        return `${m}:${s}`;
    };
    return (
        <TableContainer component={Paper} sx={{ marginTop: 5 }}>
            <Table aria-label='score-table'>
                <TableHead>
                    <TableRow>
                        <TableCell align='center' colSpan={2}>
                            <Typography variant='h3'>Best Scores</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align='center'>
                            <Typography variant='h5'>Name</Typography>
                        </TableCell>
                        <TableCell align='center'>
                            <Typography variant='h5'>Time</Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {players.map((player) => (
                        <TableRow key={player.email}>
                            <TableCell align='center'>
                                {player.username}
                            </TableCell>
                            <TableCell align='center'>
                                {formatTime(player.time)}
                            </TableCell>
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
