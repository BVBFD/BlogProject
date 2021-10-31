import React from "react";
import { Link, Switch, Route, useParams } from "react-router-dom";
import styles from "./classicHistoryEastern.module.css";
import { useRef } from "react/cjs/react.development";

const ClassicHistoryEastern = ({ classicHistoryEastern }) => {
  const initialBoxRef = useRef();
  const { keyValue } = useParams();
  const initialCodes = `
    <div>
      ${
        classicHistoryEastern[Object.keys(classicHistoryEastern).length]
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
                classicHistoryEastern[Object.keys(classicHistoryEastern).length]
                  .type
              }
            </h1>
            <h2>
              {
                classicHistoryEastern[Object.keys(classicHistoryEastern).length]
                  .title
              }
            </h2>
            <div dangerouslySetInnerHTML={{ __html: initialCodes }}></div>
          </div>
        </div>
      )}
      {Object.keys(classicHistoryEastern)
        .reverse()
        .map((key) => {
          const testStr = classicHistoryEastern[key].contents;
          // testStr.join("") 배열을 하나로 연결된 문자열로 바꾼다.
          let codes = `
              <div>
                <h1>${classicHistoryEastern[key].type}</h1>
                <h2>${classicHistoryEastern[key].title}</h2>
                <div>
                  ${testStr}
                </div>
              </div>`;
          return (
            <>
              <div className={styles.switchBox}>
                <Switch>
                  <Route path={`/classicHistoryEastern/${key}`}>
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
        {Object.keys(classicHistoryEastern)
          .reverse()
          .map((key) => {
            return (
              <li>
                <Link
                  className={styles.novelUsaEuDataList}
                  to={`/classicHistoryEastern/${key}`}
                >
                  <h4>{key}.&emsp;</h4>
                  <h4>{classicHistoryEastern[key].type}&nbsp;-&nbsp;</h4>
                  <h4>{classicHistoryEastern[key].title}</h4>
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default ClassicHistoryEastern;
