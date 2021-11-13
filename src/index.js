import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app";
import WeatherTime from "./service/weatherTime";
import ExchangeRate from "./service/exchangeRate";
import "@fortawesome/fontawesome-free/js/all.js";
import { BrowserRouter } from "react-router-dom";
import AuthMobileService from "./service/authMobileService";
import { firebaseApp } from "./service/firebase";
import DataRepository from "./service/dataRepository";
import ImageUploader from "./service/imageUploader";

const dataRepository = new DataRepository(firebaseApp);
const weatherTime = new WeatherTime(process.env.REACT_APP_WEATHER_TIME_API_KEY);
const exchangeRate = new ExchangeRate();
const authMobileService = new AuthMobileService(firebaseApp);
const imageUploader = new ImageUploader();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App
        dataRepository={dataRepository}
        authMobileService={authMobileService}
        weatherTime={weatherTime}
        exchangeRate={exchangeRate}
        imageUploader={imageUploader}
      />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
