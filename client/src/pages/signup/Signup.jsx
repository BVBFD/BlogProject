import React from "react";
import Header from "../../components/header/Header";
import styles from "./Signup.module.css";

const Signup = (props) => {
  return (
    <>
      <Header />
      <form className={styles.signupBox}>
        <div>
          <span>Sign-up</span>
        </div>
        <div className={styles.idBox}>
          <span>ID</span>
          <input type="text" autoFocus placeholder="Enter your ID" />
        </div>
        <div className={styles.emailBox}>
          <span>Email</span>
          <input type="text" autoFocus placeholder="Enter your ID" />
        </div>
        <div className={styles.pwdBox}>
          <span>Password</span>
          <input type="text" placeholder="Enter your password" />
        </div>
        <button type="submit">Sign-up</button>
      </form>
    </>
  );
};

export default Signup;
