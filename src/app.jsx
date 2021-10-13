import React from "react";
import Navbar from "./components/navbar/navbar";

const App = ({ weatherTime, exchangeRate }) => {
  return (
    <>
      <Navbar weatherTime={weatherTime} exchangeRate={exchangeRate} />
    </>
  );
};

export default App;
