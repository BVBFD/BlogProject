import React, { useRef, useState } from "react";
import Header from "./components/headerBackGround/header";
import Navbar from "./components/navbar/navbar";
import styles from "./app.module.css";
import { Link, Switch, Route } from "react-router-dom";
import NovelUsaEu from "./components/books/novelUsaEu/novelUsaEu";
import InitialPage from "./components/initialPage/initialPage";
import NovelAsia from "./components/books/novelAsia/novelAsia";
import ClassicWestern from "./components/books/classicWestern/classicWestern";
import ClassicEastern from "./components/books/classicEastern/classicEastern";
import ClassicHistoryWestern from "./components/books/classicHistoryWestern/classicHistoryWestern";
import ClassicHistoryEastern from "./components/books/classicHistoryEastern/classicHistoryEastern";
import Htmls from "./components/codings/htmls/htmls";
import Csss from "./components/codings/csss/csss";
import JvScripts from "./components/codings/jvScripts/jvScripts";
import Reacts from "./components/codings/reacts/reacts";
import NodeJs from "./components/codings/nodeJs/nodeJs";
import Fiji from "./components/trips/fiji/fiji";
import Iceland from "./components/trips/iceland/iceland";
import China from "./components/trips/china/china";
import Vietnam from "./components/trips/vietnam/vietnam";

const App = ({ weatherTime, exchangeRate }) => {
  const booksBoxRef = useRef();
  const codingsBoxRef = useRef();
  const tripsBoxRef = useRef();
  let booksEventIndex = true;
  let codingsEventIndex = true;
  let tripsEventIndex = true;

  const showBooksList = () => {
    if (booksEventIndex) {
      booksEventIndex = false;
      booksBoxRef.current.classList.add(`${styles.listShow}`);
    } else {
      booksEventIndex = true;
      booksBoxRef.current.classList.remove(`${styles.listShow}`);
    }
  };

  const showCodingsList = () => {
    if (codingsEventIndex) {
      codingsEventIndex = false;
      codingsBoxRef.current.classList.add(`${styles.listShow}`);
    } else {
      codingsEventIndex = true;
      codingsBoxRef.current.classList.remove(`${styles.listShow}`);
    }
  };

  const showTripsList = () => {
    if (tripsEventIndex) {
      tripsEventIndex = false;
      tripsBoxRef.current.classList.add(`${styles.listShow}`);
    } else {
      tripsEventIndex = true;
      tripsBoxRef.current.classList.remove(`${styles.listShow}`);
    }
  };

  return (
    <>
      <Navbar weatherTime={weatherTime} exchangeRate={exchangeRate} />
      <Header />
      <ul className={styles.listBodyBox}>
        <li className={styles.listBox}>
          <nav className={styles.blogNavBar}>
            <button className={`${styles.blogBtn} ${styles.homeBtn}`}>
              <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                Home
              </Link>
            </button>
            <button
              onClick={showBooksList}
              className={`${styles.blogBtn} ${styles.booksBtn}`}
            >
              독서
            </button>
            <div ref={booksBoxRef} className={styles.booksBox}>
              <Link to="/novelUsaEU" className={styles.linkBtn}>
                소설(북미, 유럽)
              </Link>
              <Link to="/novelAsia" className={styles.linkBtn}>
                소설(아시아)
              </Link>
              <Link to="/classicWestern" className={styles.linkBtn}>
                서양고전
              </Link>
              <Link to="/classicEastern" className={styles.linkBtn}>
                동양고전
              </Link>
              <Link to="/classicHistoryWestern" className={styles.linkBtn}>
                역사(서양)
              </Link>
              <Link to="/classicHistoryEastern" className={styles.linkBtn}>
                역사(동양)
              </Link>
            </div>
            <button
              onClick={showCodingsList}
              className={`${styles.blogBtn} ${styles.codingsBtn}`}
            >
              코딩
            </button>
            <div ref={codingsBoxRef} className={styles.codingsBox}>
              <Link to="/html" className={styles.linkBtn}>
                HTML
              </Link>
              <Link to="/css" className={styles.linkBtn}>
                CSS
              </Link>
              <Link to="/javascript" className={styles.linkBtn}>
                JavaScript
              </Link>
              <Link to="/react" className={styles.linkBtn}>
                React
              </Link>
              <Link to="/nodejs" className={styles.linkBtn}>
                Node JS
              </Link>
            </div>
            <button
              onClick={showTripsList}
              className={`${styles.blogBtn} ${styles.tripsBoxBtn}`}
            >
              여행
            </button>
            <div ref={tripsBoxRef} className={styles.tripsBox}>
              <Link to="/fiji" className={styles.linkBtn}>
                피지
              </Link>
              <Link to="/iceland" className={styles.linkBtn}>
                아이슬란드
              </Link>
              <Link to="/china" className={styles.linkBtn}>
                중국
              </Link>
              <Link to="/vietnam" className={styles.linkBtn}>
                베트남
              </Link>
            </div>
          </nav>
        </li>
        <li className={styles.bodyBox}>
          <Switch>
            {/* initial page */}
            <Route path={["/", "/home"]} exact>
              <InitialPage />
            </Route>

            {/* books */}
            <Route path="/novelUsaEU">
              <NovelUsaEu />
            </Route>

            <Route path="/novelAsia">
              <NovelAsia />
            </Route>

            <Route path="/classicWestern">
              <ClassicWestern />
            </Route>

            <Route path="/classicEastern">
              <ClassicEastern />
            </Route>

            <Route path="/classicHistoryWestern">
              <ClassicHistoryWestern />
            </Route>

            <Route path="/classicHistoryEastern">
              <ClassicHistoryEastern />
            </Route>

            {/* codings */}
            <Route path="/html">
              <Htmls />
            </Route>

            <Route path="/css">
              <Csss />
            </Route>

            <Route path="/javascript">
              <JvScripts />
            </Route>

            <Route path="/react">
              <Reacts />
            </Route>

            <Route path="/nodejs">
              <NodeJs />
            </Route>

            {/* trips */}
            <Route path="/fiji">
              <Fiji />
            </Route>

            <Route path="/iceland">
              <Iceland />
            </Route>

            <Route path="/china">
              <China />
            </Route>

            <Route path="/vietnam">
              <Vietnam />
            </Route>
          </Switch>
        </li>
      </ul>
    </>
  );
};

export default App;

// react-router-dom 쓸때 반드시 BrowserRouter 는 자식 1개 요소만 가질 수 있다.
// link, path 주소에 특수문자 쓰면 오류 남 ex) "()"
