import React, { useRef, useState } from "react";
import Header from "../../components/header/Header";
import styles from "./Signup.module.css";

const Signup = (props) => {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const idRef = useRef();
  const emailRef = useRef();
  const pwdRef = useRef();

  const onSignUp = (event) => {
    event.preventDefault();
    setId(idRef.current.value);
    setEmail(emailRef.current.value);
    setPwd(pwdRef.current.value);
  };
  // 서버 api로 validator 라이브러리 유효성 검사, 서버에서 비밀번호 bcrypt 암호화해서 검사,
  // 아이디는 jwt 토큰화 시켜서 유효기간 설정후 클라이언트, 서버 정보 교환
  // jwt 토큰은 클라이언트 로컬 db에 저장 로그아웃 실행시 삭제기능 백엔드, 클라이언트에서 구현할것

  console.log(id, email, pwd);

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
            ref={idRef}
            type="text"
            autoFocus
            placeholder="Enter your ID"
          />
        </div>
        <div className={styles.emailBox}>
          <span>Email</span>
          <input
            ref={emailRef}
            type="text"
            autoFocus
            placeholder="Enter your ID"
          />
        </div>
        <div className={styles.pwdBox}>
          <span>Password</span>
          <input ref={pwdRef} type="text" placeholder="Enter your password" />
        </div>
        <button type="submit">Sign-up</button>
      </form>
    </>
  );
};

export default Signup;
