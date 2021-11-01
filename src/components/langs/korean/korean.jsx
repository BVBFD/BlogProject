import React from "react";
import { Link, Switch, Route, useParams } from "react-router-dom";
import styles from "./korean.module.css";
import { useRef } from "react/cjs/react.development";

const Korean = ({ koreans }) => {
  const initialBoxRef = useRef();
  const { keyValue } = useParams();
  const initialCodes = `
    <div>
      ${koreans[koreans.length - 1].contents}
    </div>`;

  return (
    <>
      {!keyValue && (
        <div ref={initialBoxRef} className={styles.novelUsaEuInitialBox}>
          <div>
            <h1>{koreans[koreans.length - 1].type}</h1>
            <h2>{koreans[koreans.length - 1].title}</h2>
            <div dangerouslySetInnerHTML={{ __html: initialCodes }}></div>
          </div>
        </div>
      )}
      {Object.keys(koreans)
        .reverse()
        .map((key) => {
          const testStr = koreans[key].contents;
          // testStr.join("") 배열을 하나로 연결된 문자열로 바꾼다.
          let codes = `
              <div>
                <h1>${koreans[key].type}</h1>
                <h2>${koreans[key].title}</h2>
                <div>
                  ${testStr}
                </div>
              </div>`;
          return (
            <>
              <div className={styles.switchBox}>
                <Switch>
                  <Route path={`/korean/${koreans[key].id}`}>
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
        {Object.keys(koreans)
          .reverse()
          .map((key) => {
            return (
              <li>
                <Link
                  className={styles.novelUsaEuDataList}
                  to={`/korean/${koreans[key].id}`}
                >
                  <h4>{koreans[key].id}.&emsp;</h4>
                  <h4>{koreans[key].type}&nbsp;-&nbsp;</h4>
                  <h4>{koreans[key].title}</h4>
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default Korean;
