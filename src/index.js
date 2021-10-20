import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app";
import WeatherTime from "./service/weatherTime";
import ExchangeRate from "./service/exchangeRate";
import "@fortawesome/fontawesome-free/js/all.js";
import { BrowserRouter } from "react-router-dom";

const weatherTime = new WeatherTime(process.env.REACT_APP_WEATHER_TIME_API_KEY);
const exchangeRate = new ExchangeRate();
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App weatherTime={weatherTime} exchangeRate={exchangeRate} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
