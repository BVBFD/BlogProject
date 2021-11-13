import React, { useRef, useState } from "react";
import Header from "./components/headerBackGround/header";
import Navbar from "./components/navbar/navbar";
import styles from "./app.module.css";
import { Link, Switch, Route } from "react-router-dom";
import NovelUsaEu from "./components/books/novelUsaEu/novelUsaEu";
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
import English from "./components/langs/english/english";
import Chinese from "./components/langs/chinese/chinese";
import Korean from "./components/langs/korean/korean";
import Vietnamese from "./components/langs/vietnamese/vietnamese";
import InitialPageData from "./components/initialPageData/initialPageData";
import { useEffect } from "react";
import { useHistory } from "react-router";

const App = ({
  dataRepository,
  authMobileService,
  weatherTime,
  exchangeRate,
  imageUploader,
}) => {
  const [novelUsaEuData, setNovelUsaEuData] = useState([
    {
      id: "",
      type: "",
      title: "",
      contents: ``,
      image: ``,
      video: ``,
    },
  ]);

  const [novelAsiaData, setNovelAsiaData] = useState([
    {
      id: "",
      type: "",
      title: "",
      contents: ``,
      image: ``,
      video: ``,
    },
  ]);

  const [classicWestern, setClassicWestern] = useState([
    {
      id: "",
      type: "",
      title: "",
      contents: ``,
      image: ``,
      video: ``,
    },
  ]);

  const [classicEastern, setClassicEastern] = useState([
    {
      id: "",
      type: "",
      title: "",
      contents: ``,
      image: ``,
      video: ``,
    },
  ]);

  const [classicHistoryWestern, setClassicHistoryWestern] = useState([
    {
      id: "",
      type: "",
      title: "",
      contents: ``,
      image: ``,
      video: ``,
    },
  ]);

  const [classicHistoryEastern, setClassicHistoryEastern] = useState([
    {
      id: "",
      type: "",
      title: "",
      contents: ``,
      image: ``,
      video: ``,
    },
  ]);

  const [htmls, setHtmls] = useState([
    {
      id: "",
      type: "",
      title: "",
      contents: ``,
      image: ``,
      video: ``,
    },
  ]);

  const [csss, setCsss] = useState([
    {
      id: "",
      type: "",
      title: "",
      contents: ``,
      image: ``,
      video: ``,
    },
  ]);

  const [javascripts, setJavascripts] = useState([
    {
      id: "",
      type: "",
      title: "",
      contents: ``,
      image: ``,
      video: ``,
    },
  ]);

  const [reacts, setReacts] = useState([
    {
      id: "",
      type: "",
      title: "",
      contents: ``,
      image: ``,
      video: ``,
    },
  ]);

  const [nodeJSs, setNodeJSs] = useState([
    {
      id: "",
      type: "",
      title: "",
      contents: ``,
      image: ``,
      video: ``,
    },
  ]);

  const [fijis, setFijis] = useState([
    {
      id: "",
      type: "",
      title: "",
      contents: ``,
      image: ``,
      video: ``,
    },
  ]);

  const [icelands, setIcelands] = useState([
    {
      id: "",
      type: "",
      title: "",
      contents: ``,
      image: ``,
      video: ``,
    },
  ]);

  const [chinas, setChinas] = useState([
    {
      id: "",
      type: "",
      title: "",
      contents: ``,
      image: ``,
      video: ``,
    },
  ]);

  const [vietnams, setVietnams] = useState([
    {
      id: "",
      type: "",
      title: "",
      contents: ``,
      image: ``,
      video: ``,
    },
  ]);

  const [englishs, setEnglishs] = useState([
    {
      id: "",
      type: "",
      title: "",
      contents: ``,
      image: ``,
      video: ``,
    },
  ]);

  const [chineses, setChineses] = useState([
    {
      id: "",
      type: "",
      title: "",
      contents: ``,
      image: ``,
      video: ``,
    },
  ]);

  const [vietnameses, setVietnameses] = useState([
    {
      id: "",
      type: "",
      title: "",
      contents: ``,
      image: ``,
      video: ``,
    },
  ]);

  const [koreans, setKoreans] = useState([
    {
      id: "",
      type: "",
      title: "",
      contents: ``,
      image: ``,
      video: ``,
    },
  ]);

  const [datas, setDatas] = useState([
    // { id: "novelUsaEuData", data: novelUsaEuData },
    // { id: "novelAsiaData", data: novelAsiaData },
    // { id: "classicWestern", data: classicWestern },
    // { id: "classicEastern", data: classicEastern },
    // { id: "classicHistoryWestern", data: classicHistoryWestern },
    // { id: "classicHistoryEastern", data: classicHistoryEastern },
    // { id: "htmls", data: htmls },
    // { id: "csss", data: csss },
    // { id: "javascripts", data: javascripts },
    // { id: "reacts", data: reacts },
    // { id: "nodeJSs", data: nodeJSs },
    // { id: "fijis", data: fijis },
    // { id: "icelands", data: icelands },
    // { id: "chinas", data: chinas },
    // { id: "vietnams", data: vietnams },
    // { id: "englishs", data: englishs },
    // { id: "chineses", data: chineses },
    // { id: "vietnameses", data: vietnameses },
    // { id: "koreans", data: koreans },
  ]);

  // useEffect(() => {
  //   dataRepository.saveData(datas);
  // });

  useEffect(() => {
    const stopSync = dataRepository.syncDatas((vals) => {
      const datasCopy = [...datas];
      datasCopy.push(Object.keys(vals).map((key) => vals[key]));
      setDatas(datasCopy[0]);
      setNovelUsaEuData(datasCopy[0][0].data);
      setNovelAsiaData(datasCopy[0][1].data);
      setClassicWestern(datasCopy[0][2].data);
      setClassicEastern(datasCopy[0][3].data);
      setClassicHistoryWestern(datasCopy[0][4].data);
      setClassicHistoryEastern(datasCopy[0][5].data);
      setHtmls(datasCopy[0][6].data);
      setCsss(datasCopy[0][7].data);
      setJavascripts(datasCopy[0][8].data);
      setReacts(datasCopy[0][9].data);
      setNodeJSs(datasCopy[0][10].data);
      setFijis(datasCopy[0][11].data);
      setIcelands(datasCopy[0][12].data);
      setChinas(datasCopy[0][13].data);
      setVietnams(datasCopy[0][14].data);
      setEnglishs(datasCopy[0][15].data);
      setChineses(datasCopy[0][16].data);
      setVietnameses(datasCopy[0][17].data);
      setKoreans(datasCopy[0][18].data);
    });
    return () => stopSync();
  }, [dataRepository]);

  const [loginData, setLoginData] = useState({
    // 1: {
    //   id: process.env.React_APP_idInfo1,
    //   pwd: process.env.React_APP_pwdInfo1,
    //   admin: true,
    // },
    // 2: {
    //   id: process.env.React_APP_idInfo2,
    //   pwd: process.env.React_APP_pwdInfo2,
    // },
    // 3: {
    //   id: process.env.React_APP_idInfo3,
    //   pwd: process.env.React_APP_pwdInfo3,
    // },
    // 4: {
    //   id: process.env.React_APP_idInfo4,
    //   pwd: process.env.React_APP_pwdInfo4,
    // },
  });

  // useEffect(() => {
  //   dataRepository.saveIdData(loginData);
  // }, [dataRepository]);

  useEffect(() => {
    dataRepository.syncIdData((vals) => {
      setLoginData(vals);
    });
  }, [dataRepository]);

  const history = useHistory();
  const [historyState, setHistoryState] = useState();
  const booksBoxRef = useRef();
  const codingsBoxRef = useRef();
  const tripsBoxRef = useRef();
  const langsBoxRef = useRef();

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

  const showLangsList = () => {
    if (tripsEventIndex) {
      tripsEventIndex = false;
      langsBoxRef.current.classList.add(`${styles.listShow}`);
    } else {
      tripsEventIndex = true;
      langsBoxRef.current.classList.remove(`${styles.listShow}`);
    }
  };

  return (
    <div className={styles.appBody}>
      <Navbar
        history={history}
        setHistoryState={setHistoryState}
        authMobileService={authMobileService}
        setLoginData={setLoginData}
        loginData={loginData}
        weatherTime={weatherTime}
        exchangeRate={exchangeRate}
        dataRepository={dataRepository}
      />
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
              <Link
                to={`/novelUsaEu/${novelUsaEuData.length}`}
                className={styles.linkBtn}
              >
                소설(북미, 유럽)
              </Link>
              <Link
                to={`/novelAsia/${novelAsiaData.length}`}
                className={styles.linkBtn}
              >
                소설(아시아)
              </Link>
              <Link
                to={`/classicWestern/${classicWestern.length}`}
                className={styles.linkBtn}
              >
                서양고전
              </Link>
              <Link
                to={`/classicEastern/${classicEastern.length}`}
                className={styles.linkBtn}
              >
                동양고전
              </Link>
              <Link
                to={`/classicHistoryWestern/${classicHistoryWestern.length}`}
                className={styles.linkBtn}
              >
                역사(서양)
              </Link>
              <Link
                to={`/classicHistoryEastern/${classicHistoryEastern.length}`}
                className={styles.linkBtn}
              >
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
              <Link to={`/html/${htmls.length}`} className={styles.linkBtn}>
                HTML
              </Link>
              <Link to={`/css/${csss.length}`} className={styles.linkBtn}>
                CSS
              </Link>
              <Link
                to={`/javascript/${javascripts.length}`}
                className={styles.linkBtn}
              >
                JavaScript
              </Link>
              <Link to={`/react/${reacts.length}`} className={styles.linkBtn}>
                React
              </Link>
              <Link to={`/nodejs/${nodeJSs.length}`} className={styles.linkBtn}>
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
              <Link to={`/fiji/${fijis.length}`} className={styles.linkBtn}>
                피지
              </Link>
              <Link
                to={`/iceland/${icelands.length}`}
                className={styles.linkBtn}
              >
                아이슬란드
              </Link>
              <Link to={`/china/${chinas.length}`} className={styles.linkBtn}>
                중국
              </Link>
              <Link
                to={`/vietnam/${vietnams.length}`}
                className={styles.linkBtn}
              >
                베트남
              </Link>
            </div>
            <button
              onClick={showLangsList}
              className={`${styles.blogBtn} ${styles.langsBoxBtn}`}
            >
              언어
            </button>
            <div ref={langsBoxRef} className={styles.langsBox}>
              <Link
                to={`/english/${englishs.length}`}
                className={styles.linkBtn}
              >
                영어
              </Link>
              <Link
                to={`/chinese/${chineses.length}`}
                className={styles.linkBtn}
              >
                중국어
              </Link>
              <Link
                to={`/vietnamese/${vietnameses.length}`}
                className={styles.linkBtn}
              >
                베트남어
              </Link>
              <Link to={`/korean/${koreans.length}`} className={styles.linkBtn}>
                한국어
              </Link>
            </div>
          </nav>
        </li>
        <li className={styles.bodyBox}>
          <Switch>
            {/* initial page */}
            <Route path={["/", "/home"]} exact>
              <InitialPageData datas={datas} />
            </Route>

            {/* books */}
            <Route path={["/novelUsaEu", "/novelUsaEu/:keyValue"]} exact>
              {/* exact를 안해주면 /novelUsaEU/:keyValue URL 주소에서  /novelUsaEU 중복(/novelUsaEU, /novelUsaEU/:keyValue) 호출되게 된다.*/}
              <NovelUsaEu
                history={history}
                historyState={historyState}
                novelUsaEuData={novelUsaEuData}
                setNovelUsaEuData={setNovelUsaEuData}
                loginData={loginData}
                dataRepository={dataRepository}
                datas={datas}
                setDatas={setDatas}
                imageUploader={imageUploader}
              />
            </Route>

            <Route path={["/novelAsia", "/novelAsia/:keyValue"]} exact>
              <NovelAsia
                history={history}
                historyState={historyState}
                setNovelAsiaData={setNovelAsiaData}
                loginData={loginData}
                novelAsiaData={novelAsiaData}
                dataRepository={dataRepository}
                datas={datas}
                setDatas={setDatas}
                imageUploader={imageUploader}
              />
            </Route>

            <Route
              path={["/classicWestern", "/classicWestern/:keyValue"]}
              exact
            >
              <ClassicWestern
                history={history}
                historyState={historyState}
                loginData={loginData}
                setClassicWestern={setClassicWestern}
                classicWestern={classicWestern}
                dataRepository={dataRepository}
                datas={datas}
                setDatas={setDatas}
                imageUploader={imageUploader}
              />
            </Route>

            <Route
              path={["/classicEastern", "/classicEastern/:keyValue"]}
              exact
            >
              <ClassicEastern
                history={history}
                historyState={historyState}
                loginData={loginData}
                setClassicEastern={setClassicEastern}
                classicEastern={classicEastern}
                dataRepository={dataRepository}
                datas={datas}
                setDatas={setDatas}
                imageUploader={imageUploader}
              />
            </Route>

            <Route
              path={[
                "/classicHistoryWestern",
                "/classicHistoryWestern/:keyValue",
              ]}
              exact
            >
              <ClassicHistoryWestern
                history={history}
                historyState={historyState}
                loginData={loginData}
                setClassicHistoryWestern={setClassicHistoryWestern}
                classicHistoryWestern={classicHistoryWestern}
                dataRepository={dataRepository}
                datas={datas}
                setDatas={setDatas}
                imageUploader={imageUploader}
              />
            </Route>

            <Route
              path={[
                "/classicHistoryEastern",
                "/classicHistoryEastern/:keyValue",
              ]}
              exact
            >
              <ClassicHistoryEastern
                history={history}
                historyState={historyState}
                loginData={loginData}
                setClassicHistoryEastern={setClassicHistoryEastern}
                classicHistoryEastern={classicHistoryEastern}
                dataRepository={dataRepository}
                datas={datas}
                setDatas={setDatas}
                imageUploader={imageUploader}
              />
            </Route>

            {/* codings */}
            <Route path={["/html", "/html/:keyValue"]} exact>
              <Htmls
                history={history}
                historyState={historyState}
                loginData={loginData}
                setHtmls={setHtmls}
                htmls={htmls}
                dataRepository={dataRepository}
                datas={datas}
                setDatas={setDatas}
                imageUploader={imageUploader}
              />
            </Route>

            <Route path={["/css", "/css/:keyValue"]} exact>
              <Csss
                history={history}
                historyState={historyState}
                loginData={loginData}
                setCsss={setCsss}
                csss={csss}
                dataRepository={dataRepository}
                datas={datas}
                setDatas={setDatas}
                imageUploader={imageUploader}
              />
            </Route>

            <Route path={["/javascript", "/javascript/:keyValue"]} exact>
              <JvScripts
                history={history}
                historyState={historyState}
                loginData={loginData}
                setJavascripts={setJavascripts}
                javascripts={javascripts}
                dataRepository={dataRepository}
                datas={datas}
                setDatas={setDatas}
                imageUploader={imageUploader}
              />
            </Route>

            <Route path={["/react", "/react/:keyValue"]} exact>
              <Reacts
                history={history}
                historyState={historyState}
                loginData={loginData}
                setReacts={setReacts}
                reacts={reacts}
                dataRepository={dataRepository}
                datas={datas}
                setDatas={setDatas}
                imageUploader={imageUploader}
              />
            </Route>

            <Route path={["/nodejs", "/nodejs/:keyValue"]} exact>
              <NodeJs
                history={history}
                historyState={historyState}
                loginData={loginData}
                setNodeJSs={setNodeJSs}
                nodeJSs={nodeJSs}
                dataRepository={dataRepository}
                datas={datas}
                setDatas={setDatas}
                imageUploader={imageUploader}
              />
            </Route>

            {/* trips */}
            <Route path={["/fiji", "/fiji/:keyValue"]} exact>
              <Fiji
                history={history}
                historyState={historyState}
                loginData={loginData}
                setFijis={setFijis}
                fijis={fijis}
                dataRepository={dataRepository}
                datas={datas}
                setDatas={setDatas}
                imageUploader={imageUploader}
              />
            </Route>

            <Route path={["/iceland", "/iceland/:keyValue"]} exact>
              <Iceland
                history={history}
                historyState={historyState}
                loginData={loginData}
                setIcelands={setIcelands}
                icelands={icelands}
                dataRepository={dataRepository}
                datas={datas}
                setDatas={setDatas}
                imageUploader={imageUploader}
              />
            </Route>

            <Route path={["/china", "/china/:keyValue"]} exact>
              <China
                history={history}
                historyState={historyState}
                loginData={loginData}
                setChinas={setChinas}
                chinas={chinas}
                dataRepository={dataRepository}
                datas={datas}
                setDatas={setDatas}
                imageUploader={imageUploader}
              />
            </Route>

            <Route path={["/vietnam", "/vietnam/:keyValue"]} exact>
              <Vietnam
                history={history}
                historyState={historyState}
                loginData={loginData}
                setVietnams={setVietnams}
                vietnams={vietnams}
                dataRepository={dataRepository}
                datas={datas}
                setDatas={setDatas}
                imageUploader={imageUploader}
              />
            </Route>

            {/* languages */}
            <Route path={["/english", "/english/:keyValue"]} exact>
              <English
                history={history}
                historyState={historyState}
                loginData={loginData}
                setEnglishs={setEnglishs}
                englishs={englishs}
                dataRepository={dataRepository}
                datas={datas}
                setDatas={setDatas}
                imageUploader={imageUploader}
              />
            </Route>

            <Route path={["/chinese", "/chinese/:keyValue"]} exact>
              <Chinese
                history={history}
                historyState={historyState}
                loginData={loginData}
                setChineses={setChineses}
                chineses={chineses}
                dataRepository={dataRepository}
                datas={datas}
                setDatas={setDatas}
                imageUploader={imageUploader}
              />
            </Route>

            <Route path={["/vietnamese", "/vietnamese/:keyValue"]} exact>
              <Vietnamese
                history={history}
                historyState={historyState}
                loginData={loginData}
                setVietnameses={setVietnameses}
                vietnameses={vietnameses}
                dataRepository={dataRepository}
                datas={datas}
                setDatas={setDatas}
                imageUploader={imageUploader}
              />
            </Route>

            <Route path={["/korean", "/korean/:keyValue"]} exact>
              <Korean
                history={history}
                historyState={historyState}
                loginData={loginData}
                setKoreans={setKoreans}
                koreans={koreans}
                dataRepository={dataRepository}
                datas={datas}
                setDatas={setDatas}
                imageUploader={imageUploader}
              />
            </Route>
          </Switch>
        </li>
      </ul>
    </div>
  );
};

export default App;
