import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = (props) => {
  return (
    <header className={styles.header}>
      <div className={styles.socialSNSs}>
        <i class="fab fa-facebook-square"></i>
        <i class="fab fa-twitter-square"></i>
        <i class="fab fa-pinterest-square"></i>
        <i class="fab fa-instagram-square"></i>
      </div>
      <div className={styles.pageLinks}>
        <Link className="link" to={"/"}>
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
      <div className={styles.settingsBox}>
        <Link className="link" to={"/login"}>
          <span>LOGIN</span>
        </Link>
        <Link className="link" to={"/signup"}>
          <span>SIGN-UP</span>
        </Link>
        <i class="fas fa-search"></i>
      </div>
    </header>
  );
};

export default Header;
