import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Post from './pages/post/Post';
import Setting from './pages/setting/Setting';
import Signup from './pages/signup/Signup';
import Write from './pages/write/Write';

const App = (props) => {
  useEffect(async () => {
    const res = await fetch(
      `https://myportfolioblogproject.herokuapp.com/getXSSToken`,
      {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Origin: `http://localhost:3000`,
        },
      }
    );

    await res.json();
  }, []);
  return (
    <Routes>
      <Route path={'/'} element={<Home />} />
      <Route path={'/login'} element={<Login />} />
      <Route path={'/signup'} element={<Signup />} />
      <Route path={'/write'} element={<Write />} />
      <Route path={'/about'} element={<About />} />
      <Route path={'/contact'} element={<Contact />} />
      <Route path={'/setting'} element={<Setting />} />
      <Route path={'/post/:id'} element={<Post />} />
    </Routes>
  );
};

export default App;
