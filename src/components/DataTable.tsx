import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
} from "@mui/material";

type Player = {
    username: string;
    time: number;
};
type UserData = {
    players: Player[];
};

const DataTable = (props: UserData) => {
    const { players } = props;
    return (
        <TableContainer component={Paper}>
            <Table aria-label='score-table'>
                <TableHead>
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
                        <TableRow key={player.username}>
                            <TableCell align='center'>
                                {player.username}
                            </TableCell>
                            <TableCell align='center'>{player.time}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default DataTable;
