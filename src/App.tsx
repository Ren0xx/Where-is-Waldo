import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Main from "./components/Main";
import Register from "./components/Register";
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/playground' element={<Main />} />
                <Route path='/register' element={<Register />} />
            </Routes>
        </Router>
    );
};

export default App;
