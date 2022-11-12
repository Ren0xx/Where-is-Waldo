import { useEffect, useState } from "react";
import { getAuth, User } from "firebase/auth";
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
    const currentUser = auth.currentUser;
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    const [time, setTime] = useState(0);
    const [running, setRunning] = useState<boolean>(true);
    const [bestTime, setBestTime] = useState<string>("Unknown");
    const [toFind, setToFind] = useState<Character[]>([
        { name: "Waldo", src: IMAGES.waldo, found: true, x: 0, y: 0 },
        { name: "Wilma", src: IMAGES.wilma, found: true, x: 0, y: 0 },
        { name: "Wizard", src: IMAGES.wizard, found: true, x: 0, y: 0 },
        { name: "Woof", src: IMAGES.woofTail, found: true, x: 0, y: 0 },
        { name: "Odlaw", src: IMAGES.odlaw, found: true, x: 0, y: 0 },
        { name: "Bone", src: IMAGES.bone, found: true, x: 0, y: 0 },
        {
            name: "Binoculars",
            src: IMAGES.binoculars,
            found: true,
            x: 0,
            y: 0,
        },
        { name: "Camera", src: IMAGES.camera, found: true, x: 0, y: 0 },
        { name: "Key", src: IMAGES.key, found: true, x: 0, y: 0 },
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

    const checkIfAllFound = (characters: Character[]) => {
        return characters.every((obj) => obj.found === true);
    };
    const getBestScore = async (user: User) => {
        const docRef = doc(firestore, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setBestTime(docSnap.data().bestCompletionTime);
        }
    };

    useEffect(() => {
        if (!user) return;
        getBestScore(user);
    }, [user]);
    useEffect(() => {
        const changeBestTimeIfShorter = async (time: number) => {
            if (time < parseInt(bestTime) && user) {
                const docRef = doc(firestore, "users", user.uid);
                await updateDoc(docRef, {
                    bestCompletionTime: time,
                });
                setBestTime(time.toString());
            }
        };
        const resetGame = () => {
            const newState = toFind.map((obj: Character) => {
                return { ...obj, found: false, x: 0, y: 0 };
            });
            setToFind(newState);
            changeBestTimeIfShorter(time);
            setTime(0);
            setRunning(false);
        };
        if (loading) {
            return;
        }
        if (!user) {
            return navigate("/");
        }
        if (checkIfAllFound(toFind)) {
            alert(`you won your time was ${time}`);
            resetGame();
        }
    }, [user, loading, navigate, toFind, time, bestTime]);
    return !loading ? (
        <main className='layout'>
            <Sidebar
                currentUser={currentUser}
                running={running}
                toFind={toFind}
                time={time}
                setTime={setTime}
                bestTime={bestTime}
                setBestTime={setBestTime}
            />
            <Game toFind={toFind} markFound={markFound} />
            <Snackbar>
                <Alert severity='success' sx={{ width: "100%" }}>
                    You found something!
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
