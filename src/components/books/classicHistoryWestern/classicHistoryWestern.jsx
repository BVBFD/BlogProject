import React from "react";
import { Link, Switch, Route, useParams } from "react-router-dom";
import styles from "./classicHistoryWestern.module.css";
import { useRef } from "react/cjs/react.development";

const ClassicHistoryWestern = ({ classicHistoryWestern }) => {
  const initialBoxRef = useRef();
  const { keyValue } = useParams();
  const initialCodes = `
    <div>
      ${
        classicHistoryWestern[Object.keys(classicHistoryWestern).length]
          .contents
      }
    </div>`;

  return (
    <>
      {!keyValue && (
        <div ref={initialBoxRef} className={styles.novelUsaEuInitialBox}>
          <div>
            <h1>
              {
                classicHistoryWestern[Object.keys(classicHistoryWestern).length]
                  .type
              }
            </h1>
            <h2>
              {
                classicHistoryWestern[Object.keys(classicHistoryWestern).length]
                  .title
              }
            </h2>
            <div dangerouslySetInnerHTML={{ __html: initialCodes }}></div>
          </div>
        </div>
      )}
      {Object.keys(classicHistoryWestern)
        .reverse()
        .map((key) => {
          const testStr = classicHistoryWestern[key].contents;
          // testStr.join("") 배열을 하나로 연결된 문자열로 바꾼다.
          let codes = `
              <div>
                <h1>${classicHistoryWestern[key].type}</h1>
                <h2>${classicHistoryWestern[key].title}</h2>
                <div>
                  ${testStr}
                </div>
              </div>`;
          return (
            <>
              <div className={styles.switchBox}>
                <Switch>
                  <Route path={`/classicHistoryWestern/${key}`}>
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
        {Object.keys(classicHistoryWestern)
          .reverse()
          .map((key) => {
            return (
              <li>
                <Link
                  className={styles.novelUsaEuDataList}
                  to={`/classicHistoryWestern/${key}`}
                >
                  <h4>{key}.&emsp;</h4>
                  <h4>{classicHistoryWestern[key].type}&nbsp;-&nbsp;</h4>
                  <h4>{classicHistoryWestern[key].title}</h4>
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default ClassicHistoryWestern;
