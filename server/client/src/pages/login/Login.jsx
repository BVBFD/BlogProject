import React, { useContext, useRef, useState } from 'react';
import Header from '../../components/header/Header';
import { Context } from '../../context/context.js';
import styles from './Login.module.css';
import axiosInstance from '../../config';

const Login = (props) => {
  const { id, dispatch } = useContext(Context);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const idRef = useRef();
  const pwdRef = useRef();

  const onLogin = async (event) => {
    event.preventDefault();
    try {
      // 기존 APIs request 문법!
      // const response = await fetch(`http://localhost:5000/loginDatas/login`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     userId: idRef.current.value,
      //     password: pwdRef.current.value,
      //   }),
      // });
      // const data = await response.json();
      // console.log(data.sendLoginData.userId, data.token);
      // dispatch({
      //   type: "LOGIN_SUCCESS",
      //   payload: {
      //     userId: data.sendLoginData.userId,
      //     token: data.token,
      //   },
      // });

      // axios 라이브러리 사용!
      const res = await axiosInstance.post(`/loginDatas/login`, {
        userId: idRef.current.value,
        password: pwdRef.current.value,
      });
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          userId: res.data.sendLoginData.userId,
          // token: res.data.token,
          profilePic: res.data.sendLoginData.profilePic,
          editable: res.data.sendLoginData.editable,
          email: res.data.sendLoginData.email,
        },
      });
    } catch (err) {
      window.alert(err);
    }
    setLoginSuccess(true);
  };

  loginSuccess && window.location.replace('/');

  // event.preventDefault();
  // console.log(event);
  // dispatch({ type: "LOGIN_START" });
  // try {
  //   const res = await axios.post("/auth/login", {
  //     username: userRef.current.value,
  //     password: passwordRef.current.value,
  //   });
  //   dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  //   // 괄호 () 안에 있는 {} 객체 자체가 action임, action 객체를 매개변수로 해서
  //   // reducer에 콜백함수 전달.
  //   // 기존 reducer에 있는 state를 변경하려면 setState격인 dispatch 콜백함수를 받고
  //   // { type: "LOGIN_SUCCESS", payload: res.data } action 객체를 매개변수로 전달.
  // } catch (err) {
  //   dispatch({ type: "LOGIN_FAILURE" });
  // }
  // 백엔드 설립시 사용할 예제 코드

  // id 백엔드로 보내서 id를 비교하고, pwd bcrypt compare해서 일치하면
  // 백엔드에서 id jwt 토큰화 시켜서 전달하고 클라이언트에서는 local db에
  // 유효기간있는 토큰을 local db에 전달 저장한다.

  return (
    <>
      <Header />
      <form className={styles.loginBox} onSubmit={onLogin}>
        <div>
          <span>Login</span>
        </div>
        <div className={styles.idBox}>
          <span>ID</span>
          <input
            ref={idRef}
            type='text'
            autoFocus
            placeholder='Enter your ID'
          />
        </div>
        <div className={styles.pwdBox}>
          <span>Password</span>
          <input
            ref={pwdRef}
            type='password'
            placeholder='Enter your password'
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </>
  );
};

export default Login;
