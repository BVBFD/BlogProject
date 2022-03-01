import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/context";
import styles from "./Header.module.css";

const Header = ({ homeBtnIndex, setHomeBtnIndex }) => {
  const { id, dispatch, profilePic } = useContext(Context);
  const setClickHomeBtn = () => {
    if (!homeBtnIndex) {
      setHomeBtnIndex(false);
    } else {
      setHomeBtnIndex(true);
    }
    window.location.replace("/");
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
          <Link to={"/setting"}>
            <div className={styles.profileImgBox}>
              <img src={profilePic} />
            </div>
          </Link>
          <i class="fas fa-search"></i>
        </div>
      )}
    </header>
  );
};

export default Header;
