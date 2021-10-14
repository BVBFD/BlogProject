import React from "react";
import Header from "./components/headerBackGround/header";
import Navbar from "./components/navbar/navbar";

const App = ({ weatherTime, exchangeRate }) => {
  return (
    <>
      <Navbar weatherTime={weatherTime} exchangeRate={exchangeRate} />
      <Header />
    </>
  );
};

export default App;
