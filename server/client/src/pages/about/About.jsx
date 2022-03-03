import React from "react";
import Header from "../../components/header/Header";
import styles from "./About.module.css";

const About = (props) => {
  return (
    <>
      <Header />
      <section className={styles.about}>
        <header className={styles.pageTitle}>About</header>
        <div className={styles.aboutIntroBox}>
          <div className={styles.imgBox}>
            <img src="../images/charina.gif" alt="" />
          </div>
          <div className={styles.aboutExplainBox}>
            <header>This Blog is ...</header>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Cupiditate molestias pariatur tenetur et voluptates quisquam
              quidem sequi ad suscipit culpa inventore, soluta ut, fuga aperiam
              qui aspernatur hic accusantium perspiciatis!
            </p>
            <a href="https://bvbfd.github.io/Profile-Website-Portfolio/">
              <button>Visit Profile</button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
