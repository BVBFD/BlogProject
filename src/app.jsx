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
import InitialPageData from "./components/initialPageData/initialPageData";

const App = ({ weatherTime, exchangeRate }) => {
  const [novelUsaEuData, setNovelUsaEuData] = useState({
    1: {
      type: "소설(북미, 유럽)",
      title: "내겐 너무 좋은 세상, 황혼의 반란",
      contents: (
        <p>
          어느날 두노인에게 찾아온 휴식, 평화, 안락센터를 피해 산으로 간다.
          이들이 사는 사회는 70세 이상의 노인들을 배척하는 곳이다.
          <br></br>
          두노인은 센터의 차를 훔쳐타고, 차에 타고 있던 노인들과 산으로 가서 현
          사회에 대항하기 위해 흰여우들 이라는 집단을 이루게 된다.<br></br>{" "}
          프랑스에도 고려장과 같은 나쁜 이야기가 있었을까?
          <br></br>
          <br></br>
          베르나르 베르베르도 요즘시대의 사람들이 어른들을 공공경하기 보다는
          오히려 무시하는 세태를 비탄하고자 한게 아닐까란 생각이든다.​
          <br></br>
          그리고 나도 늙으면 휴식, 평화, 안락센터라는 이름의 요양원에
          가야만한다는 현실에 벌써부터 슬퍼진다. 주인공 뤽은 일상생활의 물건들이
          모두 말을 하는 지능을 가진 기계들로 둘러사여진 현실을 싫어한다. 하지만
          뤽에게 찾아온 아리따운 여성에 의해서 뤽 역시 인공심장을 기계이고
          살아있다는 환상을 품도록 프로그래밍되어있다는 것을 알게 된다.
          <br></br>
          <br></br>
          그녀는 뤽의 인공심장을들고 말한다. "이런 걸 달고 있는 주제에 사랑을 할
          수 있을 것이라고 생각해?"<br></br> "살아 움직이는 인간들이여,
          그대들에게 진정 영혼이 있는가?"<br></br> 우리도 어쩌면 어릴때 부터
          프로그래밍 당하면서 살아오지 않았을 까?<br></br> 결혼은 사랑이 아니라
          현실이라고 프로그래밍되어, 결혼정보회사를 찾고, 조건에 맞는 배우자를
          찾도록 말이다.
        </p>
      ),
    },
    2: {
      type: "소설(북미, 유럽)",
      title: "바캉스, 투명피부",
      contents: (
        <p>
          ​ ​6월 바캉스를 떠나려는 피에르 뤼브롱은 시간전문여행사로 가 늘
          꿈꿔오던 곳인 '루이 14세 시대'로 가고 싶어한다. 피에르는 우아하고
          고상한 시대인 그때로 가서 프랑스 파리의 오염되지 않는 공기도 마시고,
          진짜 토마토 맛이 나는 토마토를 먹고싶다고 자신이 하고 싶은 것들을
          열거한다. 하지만 그는 비용이 만만찮게 드는 곤경에 처하게되면 구조반의
          도움을 받을 수 있다는 여행 보험에 가입을 하지 않고, 1666년으로 여행을
          떠난다. 하지만 그는 우아하고 고상하다고 생각했던 1666년의 파리는 온갓
          쓰레기와 악취와 위험이 있었다. 우리도 과거로 돌아가고 싶을때가 가끔씩
          있다. 과연 과거로 돌아간다면 정말 뭔가 달라 질 수 있을까?라는 생각도
          하지만, 여행보험사의 횡포만 아니라면 과거로의 시간여행을 해보고 싶다는
          생각이 든다.
          <br></br>
          <br></br>
          ​주인공은 유전학 연구소에서 생체를 투명하게 만드는 연구의 실험을
          자신에게 한다. 실험이 성공해서 투명피부를 가지게 되지만, 다시 되돌릴
          수는 없어서 하버트 조지웰스의 투명인간처럼 자신을 모두 감싸고
          서커스단으로 들어간다. 그곳에서 한국여자인 공중 그네 공예사를 만난다.
          ​ 이 단편은 인간이 진정으로 자기 자신을 바라 보고 싶어 한다고 말할 수
          있는지에 관한 물음을 던지고 있다고 한다. 난 자신도 자신을 진정으로
          바라고 싶어하지 않고 다른 사람에게 진정한 자신을 보여주고 싶어하지
          않는다고 생각한다. 진정으로 자신을 돌아볼때 자신은 자신을 사랑할 수
          있을까? 진정으로 자신을 보여줬을때 상대방은 자신을 사랑해 줄 수
          있을까? 생각해본다. ​ ​그리고 투명피부가되 주인공을 보면서 이토준지의
          공포만화중에서 자신의 근육을 사랑해서 피부를 모두 벗겨낸 여인의
          이야기가 생각이 났다.
        </p>
      ),
    },
    3: {
      type: "소설(북미, 유럽)",
      title: "수의 비밀, 완전한 은둔자",
      contents: (
        <p>
          ​1+1=2, 4+4=8, 8+9=...우리가 너무나 쉽게 풀고 있는 이 숫자들은 뱅상이
          사는 사회에선 쉽지 않은 일이다. ​숫자 15까지 셀줄 아는 사람은 드물며
          학교에서는 숫자 9까지만 가르친다. 숫자로 계급과 계층이 나누어지는
          사회에 뱅상은 살고 있다. 어느날 667700996 이라는 동물같이 생긴 것이
          숫자라는 것을 알게되면서 혼란에 빠진다, 우리가 쉽게 이해하고 셀수
          있다고 생각한 숫자들이 정말 그렇게 간단한 것일까?라는 의문도 들지만
          수학포기자였던 나로선 별로 생각해보고 싶은 문제는 아니다.모르는게
          약이고 싶다. 하지만 조금 궁금한 생각도 드니 EBS의 문명과 수학을 시청해
          숫자를 좀더 이해해 볼까 한다.
          <br></br>
          <br></br>
          모든 것은 애초에 자기안에 있다고 생각한 ​루블레 박사는 혼자 깨우침을
          얻기 위해 은둔하게 된다. 아무리 많은 지식을 얻는다고 해도 사람들과
          부딪혀서 살지 않으면 그 지식은 공상에 불과하다고 생각한다.
        </p>
      ),
    },
  });

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
              <InitialPageData />
            </Route>

            {/* books */}
            <Route path="/novelUsaEU">
              <NovelUsaEu novelUsaEuData={novelUsaEuData} />
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
