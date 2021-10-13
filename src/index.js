import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app";
import WeatherTime from "./service/weatherTime";
import ExchangeRate from "./service/exchangeRate";

const weatherTime = new WeatherTime(process.env.REACT_APP_WEATHER_TIME_API_KEY);
const exchangeRate = new ExchangeRate();
ReactDOM.render(
  <React.StrictMode>
    <App weatherTime={weatherTime} exchangeRate={exchangeRate} />
  </React.StrictMode>,
  document.getElementById("root")
);
