import React, { useEffect, useState } from "react";
import styles from "./navbar.module.css";
import Clock from "react-live-clock";

const Navbar = ({ weatherTime, exchangeRate }) => {
  const [weather, setWeather] = useState();
  const [cityCountry, setCityCountry] = useState();
  const [USD_KRW_value, setUSD_KRW_value] = useState();

  useEffect(() => {
    // 네트워크 통신할 때 useEffect없이 하면 두번 통신하고 호출한다.
    // 그 이유에 대해서 한번 곰곰히 생각해보자..
    weatherTime.getTimeWeather().then((result) => {
      const newWeather = result.weather[0].main;
      setWeather(newWeather);
      setCityCountry(`${result.name} ${result.sys.country}`);
    });
  }, [weatherTime]);

  useEffect(() => {
    exchangeRate.getExchangeRate().then(
      (data) => {
        console.log(data);
        setUSD_KRW_value(data.REC[0].BrgnBsrt);
      },
      (err) => {
        console.log(err);
      }
    );
  }, [exchangeRate]);
  // useEffect안에서 네트워크 통신을 안하거나, 옵션에 [] 추가 안해주면
  // 여러번 네트워크와 통신하게 된다. 왜 그런지는 생각을 해보자.

  return (
    <nav className={styles.navbarBox}>
      <section className={styles.navbarLeftBox}>
        <div className={`${styles.date} ${styles.leftSmallBox}`}>
          <Clock
            format={`ddd, MMM DD, YYYY`}
            ticking={false}
            timezone={"Asia/Seoul"}
            interval={3600000}
          />
        </div>
        <div className={`${styles.time} ${styles.leftSmallBox}`}>
          <Clock format={"HH:mm:ss a"} ticking={true} timezone={"Asia/Seoul"} />
        </div>
        <div className={`${styles.weatherArea} ${styles.leftSmallBox}`}>
          {weather} / {cityCountry}
        </div>
        <div className={`${styles.exchangeRate} ${styles.leftSmallBox}`}>
          {USD_KRW_value}
        </div>
      </section>
      <section className={styles.navbarRightBox}>
        <form className={styles.searchForm}>
          <input
            className={styles.searchFormInput}
            type="text"
            placeholder="전체 검색 기능"
          />
          <button className={styles.searchFormBtn}>Click!</button>
        </form>
        <button className={styles.loginBtn}>로그인</button>
      </section>
    </nav>
  );
};

export default Navbar;
