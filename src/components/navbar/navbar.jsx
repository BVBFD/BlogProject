import React, { useEffect, useState } from "react";
import styles from "./navbar.module.css";
import Clock from "react-live-clock";
import { useRef } from "react/cjs/react.development";

const Navbar = ({ loginData, weatherTime, exchangeRate }) => {
  const [weather, setWeather] = useState();
  const [cityCountry, setCityCountry] = useState();
  const [USD_KRW_value, setUSD_KRW_value] = useState();

  const idInputRef = useRef();
  const pwdInputRef = useRef();
  const loginFormRef = useRef();
  const registerBtnRef = useRef();
  const welcomeSentRef = useRef();
  const logoutBtnRef = useRef();

  useEffect(() => {
    // 네트워크 통신할 때 useEffect없이 하면 두번 통신하고 호출한다.
    // 그 이유에 대해서 한번 곰곰히 생각해보자..
    weatherTime.getTimeWeather().then((result) => {
      if (result && result.weather.length > 0) {
        setWeather(result.weather[0].main);
      }
      setCityCountry(`${result.name} ${result.sys.country}`);
    });
  }, [weatherTime]);

  useEffect(() => {
    exchangeRate.getExchangeRate().then(
      (data) => {
        if (data && data.REC && data.REC.length > 0) {
          // Cannot read properties of undefined (reading '0') 오류 예방하기 위해서
          setUSD_KRW_value(data.REC[0].BrgnBsrt);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }, [exchangeRate]);
  // useEffect안에서 네트워크 통신을 안하거나, 옵션에 [] 추가 안해주면
  // 여러번 네트워크와 통신하게 된다. 왜 그런지는 생각을 해보자.

  const onLogin = (event) => {
    event.preventDefault();
    const endIndex = Object.keys(loginData).length;
    console.log(idInputRef.current.value, pwdInputRef.current.value);
    for (let i = 1; i < endIndex + 1; i++) {
      console.log(loginData[i].id, loginData[i].pwd);
      if (
        loginData[i].id === idInputRef.current.value &&
        loginData[i].pwd === pwdInputRef.current.value
      ) {
        console.log("로그인 성공");
        welcomeSentRef.current.innerHTML = `안녕하세요! ${loginData[i].id}님`;
        loginFormRef.current.classList.add(`${styles.logoutBtn}`);
        registerBtnRef.current.classList.add(`${styles.logoutBtn}`);
        welcomeSentRef.current.style.display = "flex";
        logoutBtnRef.current.style.display = "flex";
        break;
      }
      if (loginData[i].id !== idInputRef.current.value) {
        alert("아이디 불일치! 다시 입력해주세요!");
        break;
      }
      if (loginData[i].pwd !== pwdInputRef.current.value) {
        alert("비밀번호 불일치! 다시 입력해주세요!");
      }
      break;
    }
  };

  const onLogout = () => {
    welcomeSentRef.current.innerHTML = ``;
    loginFormRef.current.classList.remove(`${styles.logoutBtn}`);
    registerBtnRef.current.classList.remove(`${styles.logoutBtn}`);
    welcomeSentRef.current.style.display = "none";
    logoutBtnRef.current.style.display = "none";
  };

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
          {weather ? weather : "새로고침 클릭!"} /{" "}
          {cityCountry ? cityCountry : "새로고침 클릭!"}
        </div>
        <div className={`${styles.exchangeRate} ${styles.leftSmallBox}`}>
          {USD_KRW_value ? USD_KRW_value : "새로고침 클릭!"}
        </div>
      </section>
      <section className={styles.navbarRightBox}>
        <form className={styles.searchForm}>
          <input
            className={styles.navbarInput}
            type="text"
            placeholder="전체 검색 기능"
          />
          <button className={styles.navbarBtn}>Click!</button>
        </form>

        <form
          ref={loginFormRef}
          className={styles.loginForm}
          onSubmit={(event) => onLogin(event)}
        >
          <input
            ref={idInputRef}
            className={styles.navbarInput}
            type="text"
            placeholder="ID"
          />
          <input
            ref={pwdInputRef}
            className={styles.navbarInput}
            type="text"
            placeholder="PassWord"
          />
          <button className={styles.navbarBtn}>로그인</button>
        </form>
        <button ref={registerBtnRef} className={styles.navbarBtn}>
          회원가입
        </button>
        <p ref={welcomeSentRef} className={styles.welcomeSentBox}></p>
        <button
          onClick={() => onLogout()}
          ref={logoutBtnRef}
          className={`${styles.navbarBtn} ${styles.logoutBtn}`}
        >
          로그아웃
        </button>
      </section>
    </nav>
  );
};

export default Navbar;
