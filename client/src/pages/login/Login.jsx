import React from "react";
import Header from "../../components/header/Header";
import styles from "./Login.module.css";

const Login = (props) => {
  return (
    <>
      <Header />
      <form className={styles.loginBox}>
        <div>
          <span>Login</span>
        </div>
        <div className={styles.idBox}>
          <span>ID</span>
          <input type="text" autoFocus placeholder="Enter your ID" />
        </div>
        <div className={styles.pwdBox}>
          <span>Password</span>
          <input type="text" placeholder="Enter your password" />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
};

export default Login;
