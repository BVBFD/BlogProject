import React, { useCallback, memo, useEffect, useState } from "react";
import styles from "./navbar.module.css";
import Clock from "react-live-clock";
import { useRef } from "react/cjs/react.development";

const Navbar = memo(
  ({
    loginData,
    weatherTime,
    exchangeRate,
    authMobileService,
    setLoginData,
    history,
    setHistoryState,
    dataRepository,
  }) => {
    const [weather, setWeather] = useState();
    const [weatherIcon, setWeatherIcon] = useState();
    const [cityCountry, setCityCountry] = useState();
    const [USD_KRW_value, setUSD_KRW_value] = useState();
    const [number, setNumber] = useState(undefined);
    const [otp, setOtp] = useState(undefined);

    const idInputRef = useRef();
    const pwdInputRef = useRef();
    const loginFormRef = useRef();
    const registerBtnRef = useRef();
    const welcomeSentRef = useRef();
    const logoutBtnRef = useRef();
    const numRef = useRef();
    const otpRef = useRef();
    const mobileAuthRef = useRef();
    const signUpBoxIdInputRef = useRef();
    const signUpBoxPwdInputRef = useRef();
    const signUpBoxRef = useRef();

    useEffect(() => {
      // 네트워크 통신할 때 useEffect없이 하면 두번 통신하고 호출한다.
      // 그 이유에 대해서 한번 곰곰히 생각해보자..
      weatherTime.getTimeWeather().then((result) => {
        if (result?.weather?.length > 0) {
          console.log(result?.weather[0]?.icon);
          if (
            result?.weather[0]?.icon === "01d" ||
            result?.weather[0]?.icon === "01n"
          ) {
            setWeatherIcon(`../images/NB01.png`);
          } else {
            setWeatherIcon(
              `http://openweathermap.org/img/wn/${result?.weather[0]?.icon}.png`
            );
          }
          setWeather(result?.weather[0]?.main);
        }
        setCityCountry(`${result.name} ${result.sys?.country}`);
      });
    }, [weatherTime]);

    useEffect(() => {
      exchangeRate.getExchangeRate().then(
        (data) => {
          if (data?.REC?.length > 0) {
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
      const idArray = Object.keys(loginData).map((key) => {
        return loginData[key].id;
      });
      const pwdArray = Object.keys(loginData).map((key) => {
        return loginData[key].pwd;
      });
      if (
        idArray.includes(idInputRef.current.value) &&
        pwdArray.includes(pwdInputRef.current.value)
      ) {
        welcomeSentRef.current.innerHTML = `안녕하세요! ${idInputRef.current.value}님`;
        loginFormRef.current.classList.add(`${styles.logoutBtn}`);
        registerBtnRef.current.classList.add(`${styles.logoutBtn}`);
        welcomeSentRef.current.style.display = "flex";
        logoutBtnRef.current.style.display = "flex";
        history.push({
          state: idInputRef.current.value,
        });
        setHistoryState(history?.location?.state);
      } else if (
        idArray.includes(idInputRef.current.value) === false &&
        pwdArray.includes(pwdInputRef.current.value) === true
      ) {
        alert("아이디가 불일치합니다. 다시 입력해주세요");
      } else if (
        pwdArray.includes(pwdInputRef.current.value) === false &&
        idArray.includes(idInputRef.current.value) === true
      ) {
        alert("비밀번호가 불일치합니다. 다시 입력해주세요");
      } else if (
        idArray.includes(idInputRef.current.value) === false &&
        pwdArray.includes(pwdInputRef.current.value) === false
      ) {
        alert("회원정보가 존재하지 않습니다. 회원가입을 해주세요");
      }
    };

    const onLogout = () => {
      welcomeSentRef.current.innerHTML = ``;
      loginFormRef.current.classList.remove(`${styles.logoutBtn}`);
      registerBtnRef.current.classList.remove(`${styles.logoutBtn}`);
      welcomeSentRef.current.style.display = "none";
      logoutBtnRef.current.style.display = "none";
      history.push({
        state: undefined,
      });
      setHistoryState(history?.location?.state);
      // history location 안에 있는 state에 push()함수로 값을 밀어주고
      // 따로 useState를 만들어서 바뀌는 값을 setState로 관리를 해주어야 한다.
    };

    const signUpFormBtn = () => {
      if (mobileAuthRef.current.style.display === "none") {
        mobileAuthRef.current.style.display = "block";
      } else {
        mobileAuthRef.current.style.display = "none";
      }
    };

    const handleNumChange = (event) => {
      setNumber(event.target.value);
      console.log(number);
    };

    const handleOtpChange = (event) => {
      setOtp(event.target.value);
      console.log(otp);
    };

    const numberSubmit = (event) => {
      event.preventDefault();
      authMobileService.onSignInSubmit(number);
    };

    const otpSubmit = (event) => {
      event.preventDefault();
      authMobileService.onSubmitOTP(otp, getOnSignUpPage);
    };

    const getOnSignUpPage = () => {
      mobileAuthRef.current.style.display = "none";
      signUpBoxRef.current.style.display = "block";
    };

    const signUpIdPwd = (event) => {
      event.preventDefault();
      console.log(Object.keys(loginData).length);
      let newIndex = Object.keys(loginData).length;
      const id = signUpBoxIdInputRef.current.value;
      const pwd = signUpBoxPwdInputRef.current.value;
      newIndex = newIndex + 1;
      loginData[newIndex] = { id: id, pwd: pwd };
      setLoginData({ ...loginData, newIndex: loginData[newIndex] });
      let loginDataCopy = { ...loginData };
      loginDataCopy[newIndex] = loginData[newIndex];
      dataRepository.saveIdData(loginDataCopy);
      console.log(loginData);
      signUpBoxRef.current.style.display = "none";
    };

    const searchTotalData = useCallback((event) => {
      history.push(`/`);
      if (event.target.value.includes("\\")) {
        return;
      }
      // 역슬래시 검색창에 치면 나타나는 오류 해결
      const listDatas = document.querySelectorAll(
        ".initialPageData_searchDatasList__3SeJ3"
      );
      listDatas.forEach((name) => {
        console.log(name.innerText.search(event.target.value));
        if (name.innerText.search(event.target.value) !== -1) {
          name.parentNode.style.display = "flex";
        } else {
          name.parentNode.style.display = "none";
        }
      });
    });

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
            <Clock
              format={"HH:mm:ss a"}
              ticking={true}
              timezone={"Asia/Seoul"}
            />
          </div>
          <div className={`${styles.weatherArea} ${styles.leftSmallBox}`}>
            <img className={styles.weatherLogo} src={weatherIcon} />
            {weather ? weather : "새로고침 클릭!"} /{" "}
            {cityCountry ? cityCountry : "새로고침 클릭!"}
          </div>
          <div className={`${styles.exchangeRate} ${styles.leftSmallBox}`}>
            <img className={styles.flagImg} src="../images/USA.png" />
            {USD_KRW_value ? USD_KRW_value : "새로고침 클릭!"} (KRW/USD)
          </div>
        </section>
        <section className={styles.navbarRightBox}>
          <form className={styles.searchForm}>
            <input
              onChange={searchTotalData}
              className={styles.navbarInput}
              type="text"
              placeholder="전체 검색 기능"
            />
            <button className={styles.navbarBtn}>새로고침</button>
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
              type="password"
              placeholder="PassWord"
            />
            <button className={styles.navbarBtn}>로그인</button>
          </form>
          <button
            onClick={() => signUpFormBtn()}
            ref={registerBtnRef}
            className={styles.navbarBtn}
          >
            회원가입
          </button>

          <div ref={mobileAuthRef} className={styles.mobileAuthBox}>
            <h3 className={styles.mobileAuthH3}>회원가입 본인인증</h3>
            <form onSubmit={numberSubmit} className={styles.mobileAuthForm}>
              <div id="sign-in-button"></div>
              <input
                className={styles.mobileAuthBoxNumInput}
                ref={numRef}
                type="number"
                name="mobile"
                placeholder="전화번호 입력, 클릭!!"
                onChange={handleNumChange}
                required
              />
              <button className={styles.mobileAuthBoxNumBtn} type="submit">
                Submit
              </button>
            </form>

            <form onSubmit={otpSubmit} className={styles.mobileAuthForm}>
              <input
                className={styles.mobileAuthBoxOtpInput}
                ref={otpRef}
                type="number"
                name="otp"
                placeholder="인증번호 입력, 클릭!!"
                onChange={handleOtpChange}
                required
              />
              <button className={styles.mobileAuthBoxOtpBtn} type="submit">
                Submit
              </button>
            </form>
          </div>

          <div ref={signUpBoxRef} className={styles.signUpBox}>
            <h3 className={styles.mobileAuthH3}>회원가입</h3>
            <form onSubmit={signUpIdPwd} className={styles.mobileAuthForm}>
              <input
                ref={signUpBoxIdInputRef}
                type="text"
                name="id"
                placeholder="ID"
                required
              />
              <input
                ref={signUpBoxPwdInputRef}
                name="pwd"
                type="text"
                placeholder="Password"
                required
              />
              <button type="submit">Submit</button>
            </form>
          </div>

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
  }
);

export default Navbar;
