import React from "react";
import { Link, Switch, Route, useParams } from "react-router-dom";
import styles from "./english.module.css";
import { useRef } from "react/cjs/react.development";

const English = ({ englishs }) => {
  const initialBoxRef = useRef();
  const { keyValue } = useParams();
  const initialCodes = `
    <div>
      ${englishs[Object.keys(englishs).length].contents}
    </div>`;

  return (
    <>
      {!keyValue && (
        <div ref={initialBoxRef} className={styles.novelUsaEuInitialBox}>
          <div>
            <h1>{englishs[Object.keys(englishs).length].type}</h1>
            <h2>{englishs[Object.keys(englishs).length].title}</h2>
            <div dangerouslySetInnerHTML={{ __html: initialCodes }}></div>
          </div>
        </div>
      )}
      {Object.keys(englishs)
        .reverse()
        .map((key) => {
          const testStr = englishs[key].contents;
          // testStr.join("") 배열을 하나로 연결된 문자열로 바꾼다.
          let codes = `
              <div>
                <h1>${englishs[key].type}</h1>
                <h2>${englishs[key].title}</h2>
                <div>
                  ${testStr}
                </div>
              </div>`;
          return (
            <>
              <div className={styles.switchBox}>
                <Switch>
                  <Route path={`/english/${key}`}>
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
        {Object.keys(englishs)
          .reverse()
          .map((key) => {
            return (
              <li>
                <Link
                  className={styles.novelUsaEuDataList}
                  to={`/english/${key}`}
                >
                  <h4>{key}.&emsp;</h4>
                  <h4>{englishs[key].type}&nbsp;-&nbsp;</h4>
                  <h4>{englishs[key].title}</h4>
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default English;
