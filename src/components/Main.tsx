import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Game from "./playground/Game";
import "../styles/style.css";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebaseConfig";
import IMAGES from "../components/playground/images";
import { Snackbar, Alert, CircularProgress } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
type Character = {
    name: string;
    src: string;
    found: boolean;
    x: number;
    y: number;
};
const Main = () => {
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    const [winningLabelOpen, setWinningLabelOpen] = useState<boolean>(false);
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState<boolean>(true);
    const [toFind, setToFind] = useState<Character[]>([
        { name: "Waldo", src: IMAGES.waldo, found: false, x: 0, y: 0 },
        { name: "Wilma", src: IMAGES.wilma, found: false, x: 0, y: 0 },
        { name: "Wizard", src: IMAGES.wizard, found: false, x: 0, y: 0 },
        { name: "Woof", src: IMAGES.woofTail, found: false, x: 0, y: 0 },
        { name: "Odlaw", src: IMAGES.odlaw, found: false, x: 0, y: 0 },
        { name: "Bone", src: IMAGES.bone, found: false, x: 0, y: 0 },
        {
            name: "Binoculars",
            src: IMAGES.binoculars,
            found: false,
            x: 0,
            y: 0,
        },
        { name: "Camera", src: IMAGES.camera, found: false, x: 0, y: 0 },
        { name: "Key", src: IMAGES.key, found: false, x: 0, y: 0 },
        { name: "Scroll", src: IMAGES.scroll, found: false, x: 0, y: 0 },
    ]);
    const markFound = (name: string, x: number, y: number) => {
        const newState = toFind.map((obj: Character) => {
            if (obj.name === name) {
                return { ...obj, found: true, x: x, y: y };
            }
            return obj;
        });
        setToFind(newState);
    };
    const handleLabelClose = () => {
        setWinningLabelOpen(false);
        setTime(0);
        setRunning(true);
    };
    const checkIfAllFound = (characters: Character[]) => {
        return characters.every((obj) => obj.found === true);
    };
    const formatTime = (time: number) => {
        const m = Math.floor((time % 3600) / 60)
                .toString()
                .padStart(2, "0"),
            s = Math.floor(time % 60)
                .toString()
                .padStart(2, "0");
        return `${m}:${s}`;
    };

    useEffect(() => {
        const changeBestTimeIfShorter = async (time: number) => {
            if (user) {
                console.log(user);
                const docRef = doc(firestore, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (
                    docSnap.exists() &&
                    (time < docSnap.data().time || docSnap.data().time === 0)
                ) {
                    await updateDoc(docRef, {
                        time: time,
                    });
                }
            }
        };
        const resetGame = () => {
            const newState = toFind.map((obj: Character) => {
                return { ...obj, found: false, x: 0, y: 0 };
            });
            setToFind(newState);
            setRunning(false);
            changeBestTimeIfShorter(time);
        };
        if (loading) {
            return;
        }
        if (!user) {
            return navigate("/");
        }
        if (checkIfAllFound(toFind)) {
            setWinningLabelOpen(true);
            resetGame();
        }
    }, [user, loading, navigate, toFind, time]);
    return !loading ? (
        <main className='layout'>
            <Sidebar
                running={running}
                toFind={toFind}
                time={time}
                setTime={setTime}
            />
            <Game toFind={toFind} markFound={markFound} />
            <Snackbar
                open={winningLabelOpen}
                onClose={handleLabelClose}
                anchorOrigin={{ horizontal: "center", vertical: "top" }}>
                <Alert
                    severity='success'
                    variant='filled'
                    sx={{ width: "100%" }}>
                    You've won! Your time was:{" "}
                    {<strong> {formatTime(time)}</strong>}
                </Alert>
            </Snackbar>
        </main>
    ) : (
        <Backdrop open={loading}>
            <CircularProgress color='success' />
        </Backdrop>
    );
};

export default Main;
