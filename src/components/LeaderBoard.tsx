import { useEffect, useState } from "react";
import { firestore } from "../firebaseConfig";
import { Snackbar, Alert, CircularProgress } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import DataTable from "./DataTable";
import {
    collection,
    query,
    where,
    onSnapshot,
    limit,
    orderBy,
} from "firebase/firestore";

type Player = {
    username: string;
    time: number;
    email: string;
};
const LeaderBoard = () => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const getData = async () => {
        const q = query(collection(firestore, "users"), orderBy("time", "asc"));
        onSnapshot(q, (querySnapshot) => {
            const playersList: Player[] = [];
            querySnapshot.forEach((doc) => {
                const obj = {
                    username: doc.data().username,
                    time: doc.data().time,
                    email: doc.data().email,
                };
                if (doc.data().time !== 0) {
                    playersList.push(obj);
                }
            });
            setPlayers(playersList);
            setIsLoading(false);
        });
    };
    useEffect(() => {
        getData();

        return () => {
            getData();
        };
    }, []);
    return (
        <>
            <DataTable players={players} />
        </>
    );
};

export default LeaderBoard;
