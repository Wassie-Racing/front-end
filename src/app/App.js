import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeV1 from "../pages/homeV1";
import Flip from "../pages/flip";
import HighLow from "../pages/highlow";

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomeV1/>} exact />
        <Route path="/flip" element={<Flip/>} exact />
        <Route path="/highlow" element={<HighLow/>} exact />
      </Routes>
    </div>
  );
}

export default App;
