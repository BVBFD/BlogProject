import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Write from "./pages/write/Write";

const App = (props) => {
  return (
    <div>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/write"} element={<Write />} />
      </Routes>
    </div>
  );
};

export default App;
