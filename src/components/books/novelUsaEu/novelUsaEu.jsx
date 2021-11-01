import React from "react";
import { Link, Switch, Route, useParams, useHistory } from "react-router-dom";
import styles from "./novelUsaEu.module.css";
import { useRef, useState } from "react/cjs/react.development";

const NovelUsaEu = ({ novelUsaEuData, setNovelUsaEuData }) => {
  console.log(novelUsaEuData.length);
  const history = useHistory();
  const [newWritingDefaultIndex, setNewWritingDefaultIndex] = useState(false);
  const initialBoxRef = useRef();
  const newWritingLiRef = useRef();
  const newWritingLiRouteRef = useRef();

  const { keyValue } = useParams();
  console.log(Boolean(keyValue));
  const initialCodes = `
    <div>
      ${novelUsaEuData[novelUsaEuData.length - 1].contents}
    </div>`;
  console.log(novelUsaEuData.length);

  let newKey = novelUsaEuData.length + 1;
  const newWritingDefaultUpdata = () => {
    if (!newWritingDefaultIndex) {
      newWritingLiRef.current.style.display = "block";
      history.push(`/novelUsaEU/${newKey}`);
      setNewWritingDefaultIndex(true);
    } else {
      newWritingLiRef.current.style.display = "none";
      history.push(`/novelUsaEU/${novelUsaEuData.length}`);
      setNewWritingDefaultIndex(false);
    }
  };

  let [newSubTitle, setNewSubTitle] = useState();
  let [newTestStr, setNewTestStr] = useState();
  // 항상 리액트처럼 생각을 하자!!
  const writeFormSubTitleInputOnChange = (event) => {
    newSubTitle = `${event.target.value}`;
    setNewSubTitle(newSubTitle);
    console.log(newSubTitle);
  };
  const writeFormContentsTextareaOnChange = (event) => {
    newTestStr = `${event.target.value}`;
    setNewTestStr(newTestStr);
    console.log(newTestStr);
  };

  return (
    <>
      <li ref={newWritingLiRef} className={styles.newWritingLi}>
        <Route ref={newWritingLiRouteRef} path={`/novelUsaEU/${newKey}`}>
          <div className={styles.novelUsaEuBox}>
            <div>
              <h1>{novelUsaEuData[1].type}</h1>
              <h2>{newSubTitle}</h2>
              <div>
                <p>{newTestStr}</p>
              </div>
            </div>
          </div>
        </Route>
        <Link
          className={styles.novelUsaEuDataList}
          to={`/novelUsaEU/${newKey}`}
        >
          <h4>{newKey}.&emsp;</h4>
          <h4>{novelUsaEuData[1].type}&nbsp;-&nbsp;</h4>
          <h4>{newSubTitle}</h4>
        </Link>

        <form className={styles.writeForm}>
          <input
            className={styles.writeFormSubTitleInput}
            onChange={writeFormSubTitleInputOnChange}
          />
          <textarea
            className={styles.writeFormContentsTextarea}
            onChange={writeFormContentsTextareaOnChange}
          ></textarea>
          <button>작성</button>
        </form>
      </li>

      {!keyValue && (
        <div ref={initialBoxRef} className={styles.novelUsaEuInitialBox}>
          <div>
            <h1>{novelUsaEuData[novelUsaEuData.length - 1].type}</h1>
            <h2>{novelUsaEuData[novelUsaEuData.length - 1].title}</h2>
            <div dangerouslySetInnerHTML={{ __html: initialCodes }}></div>
          </div>
        </div>
      )}

      {Object.keys(novelUsaEuData)
        .reverse()
        .map((key) => {
          const testStr = novelUsaEuData[key].contents;
          // testStr.join("") 배열을 하나로 연결된 문자열로 바꾼다.
          let codes = `
              <div>
                <h1>${novelUsaEuData[key].type}</h1>
                <h2>${novelUsaEuData[key].title}</h2>
                <div>
                  ${testStr}
                </div>
              </div>`;
          return (
            <>
              <div className={styles.switchBox}>
                <Switch>
                  <Route path={`/novelUsaEU/${novelUsaEuData[key].id}`}>
                    <div
                      className={styles.novelUsaEuBox}
                      dangerouslySetInnerHTML={{ __html: codes }}
                    ></div>
                  </Route>
                </Switch>
              </div>
            </>
          );
        })}
      <ul className={styles.novelUsaEuDataUlBox}>
        {Object.keys(novelUsaEuData)
          .reverse()
          .map((key) => {
            {
              console.log(novelUsaEuData[key]);
            }
            return (
              <li>
                <Link
                  className={styles.novelUsaEuDataList}
                  to={`/novelUsaEU/${novelUsaEuData[key].id}`}
                >
                  <h4>{novelUsaEuData[key].id}.&emsp;</h4>
                  <h4>{novelUsaEuData[key].type}&nbsp;-&nbsp;</h4>
                  <h4>{novelUsaEuData[key].title}</h4>
                </Link>
              </li>
            );
          })}
      </ul>

      <button onClick={newWritingDefaultUpdata}>글쓰기</button>
      <button>삭제</button>
    </>
  );
};

export default NovelUsaEu;
