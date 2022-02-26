import React from "react";
import { Route, Routes } from "react-router-dom";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Post from "./pages/post/Post";
import Signup from "./pages/signup/Signup";
import Write from "./pages/write/Write";

const App = (props) => {
  return (
    <div>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/signup"} element={<Signup />} />
        <Route path={"/write"} element={<Write />} />
        <Route path={"/about"} element={<About />} />
        <Route path={"/contact"} element={<Contact />} />
        <Route path={"/post/:id"} element={<Post />} />
      </Routes>
    </div>
  );
};

export default App;