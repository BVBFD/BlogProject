import React, { useContext, useState } from "react";
import Header from "../../components/header/Header";
import styles from "./Signup.module.css";
import { Context } from "../../context/context.js";
import axios from "axios";

const Signup = (props) => {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const { dispatch } = useContext(Context);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const onSignUp = async (event) => {
    event.preventDefault();
    // 기존 APIs request 문법!
    // try {
    //   const response = await fetch(`http://localhost:5000/loginDatas/signup`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       userId: id,
    //       password: pwd,
    //       email: email,
    //       profilePic: "",
    //     }),
    //   });
    //   const data = await response.json();
    //   console.log(data);
    //   dispatch({
    //     type: "LOGIN_SUCCESS",
    //     payload: {
    //       userId: data.data.userId,
    //       token: data.token,
    //     },
    //   });
    // } catch (err) {
    //   console.log(err);
    // }

    // axios 라이브러리 사용!
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/loginDatas/signup`,
        {
          userId: id,
          password: pwd,
          email: email,
          profilePic: "",
        }
      );
      console.log(res.data.data.userId, res.data.token);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          userId: res.data.data.userId,
          token: res.data.token,
        },
      });
    } catch (err) {
      console.log(err);
    }
    setLoginSuccess(true);
  };
  // 서버 api로 validator 라이브러리 유효성 검사, 서버에서 비밀번호 bcrypt 암호화해서 검사,
  // 아이디는 jwt 토큰화 시켜서 유효기간 설정후 클라이언트, 서버 정보 교환
  // jwt 토큰은 클라이언트 로컬 db에 저장 로그아웃 실행시 삭제기능 백엔드, 클라이언트에서 구현할것

  loginSuccess && window.location.replace("/");

  return (
    <>
      <Header />
      <form className={styles.signupBox} onSubmit={onSignUp}>
        <div>
          <span>Sign-up</span>
        </div>
        <div className={styles.idBox}>
          <span>ID</span>
          <input
            type="text"
            autoFocus
            placeholder="Enter your ID"
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div className={styles.emailBox}>
          <span>Email</span>
          <input
            type="email"
            autoFocus
            placeholder="Enter your Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.pwdBox}>
          <span>Password</span>
          <input
            type="password"
            onChange={(e) => setPwd(e.target.value)}
            placeholder="Enter your Password"
          />
        </div>
        <button type="submit">Sign-up</button>
      </form>
    </>
  );
};

export default Signup;
