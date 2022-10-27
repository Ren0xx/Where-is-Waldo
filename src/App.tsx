import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Game from "./components/Game";
import Register from "./components/Register"
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/playground' element={<Game />} />
                <Route path='/register' element={<Register />} />
            </Routes>
        </Router>
    );
};

export default App;
