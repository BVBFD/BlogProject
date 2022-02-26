import React, { useRef, useState } from "react";
import Header from "../../components/header/Header";
import styles from "./Login.module.css";

const Login = (props) => {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");

  const idRef = useRef();
  const pwdRef = useRef();

  const onLogin = (event) => {
    event.preventDefault();
    setId(idRef.current.value);
    setPwd(pwdRef.current.value);
  };
  // id 백엔드로 보내서 id를 비교하고, pwd bcrypt compare해서 일치하면
  // 백엔드에서 id jwt 토큰화 시켜서 전달하고 클라이언트에서는 local db에
  // 유효기간있는 토큰을 local db에 전달 저장한다.

  console.log(id, pwd);

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
            type="text"
            autoFocus
            placeholder="Enter your ID"
          />
        </div>
        <div className={styles.pwdBox}>
          <span>Password</span>
          <input ref={pwdRef} type="text" placeholder="Enter your password" />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
};

export default Login;
