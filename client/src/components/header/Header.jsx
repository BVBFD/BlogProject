import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/context";
import styles from "./Header.module.css";

const Header = ({ homeBtnIndex, setHomeBtnIndex }) => {
  const { id, dispatch } = useContext(Context);
  const setClickHomeBtn = () => {
    if (!homeBtnIndex) {
      setHomeBtnIndex(true);
    } else {
      setHomeBtnIndex(false);
    }
  };

  const onLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <header className={styles.header}>
      <div className={styles.socialSNSs}>
        <i class="fab fa-facebook-square"></i>
        <i class="fab fa-twitter-square"></i>
        <i class="fab fa-pinterest-square"></i>
        <i class="fab fa-instagram-square"></i>
      </div>
      <div className={styles.pageLinks}>
        <Link onClick={setClickHomeBtn} className="link" to={"/"}>
          <span>HOME</span>
        </Link>
        <Link className="link" to={"/about"}>
          <span>ABOUT</span>
        </Link>
        <Link className="link" to={"/contact"}>
          <span>CONTACT</span>
        </Link>
        <Link className="link" to={"/write"}>
          <span>WRITE</span>
        </Link>
      </div>
      {!id ? (
        <div className={styles.settingsBox}>
          <Link className="link" to={"/login"}>
            <span>LOGIN</span>
          </Link>
          <Link className="link" to={"/signup"}>
            <span>SIGN-UP</span>
          </Link>
          <i class="fas fa-search"></i>
        </div>
      ) : (
        <div className={styles.logoutBox}>
          <span onClick={onLogout}>Log-out</span>
          <div className={styles.profileImgBox}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/180717_%EC%97%B4%EB%A6%B0%EC%9D%8C%EC%95%85%ED%9A%8C_%ED%8A%B8%EC%99%80%EC%9D%B4%EC%8A%A4_%2818%29.jpg/250px-180717_%EC%97%B4%EB%A6%B0%EC%9D%8C%EC%95%85%ED%9A%8C_%ED%8A%B8%EC%99%80%EC%9D%B4%EC%8A%A4_%2818%29.jpg" />
          </div>
          <i class="fas fa-search"></i>
        </div>
      )}
    </header>
  );
};

export default Header;
