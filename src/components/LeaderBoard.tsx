import { useEffect, useState } from "react";
import { firestore } from "../firebaseConfig";
import { Backdrop, CircularProgress } from "@mui/material";
import DataTable from "./DataTable";
import {
    collection,
    query,
    onSnapshot,
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
    return !isLoading ? (
        <DataTable players={players} />
    ) : (
        <Backdrop open={isLoading}>
            <CircularProgress color='success' />
        </Backdrop>
    );
};

export default LeaderBoard;
