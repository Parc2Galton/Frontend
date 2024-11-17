import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Simulation from "./components/Simulation";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/simulation" element={<Simulation />} />
            </Routes>
        </Router>
    );
}

export default App;
