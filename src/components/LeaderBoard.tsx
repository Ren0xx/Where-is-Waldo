import { useEffect, useState } from "react";
import { firestore } from "../firebaseConfig";
import { Snackbar, Alert, CircularProgress } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import {
    collection,
    query,
    where,
    onSnapshot,
    limit,
} from "firebase/firestore";

type Player = {
    username: string;
    time: number;
};
const LeaderBoard = () => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const getData = async () => {
        const q = query(collection(firestore, "leaderboard"));
        const scoreDocs = onSnapshot(q, (querySnapshot) => {
            const playersList: Player[] = [];
            querySnapshot.forEach((doc) => {
                const obj = {
                    username: doc.data().username,
                    time: doc.data().time,
                };
                playersList.push(obj);
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
            {players?.map((player: Player) => {
                return !isLoading ? (
                    <div key={player.username}>
                        <p>{player.username}</p>
                        <p>{player.time}</p>
                    </div>
                ) : (
                    <CircularProgress />
                );
            })}
        </>
    );
};

export default LeaderBoard;
