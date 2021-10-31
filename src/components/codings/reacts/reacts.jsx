import React from "react";
import { Link, Switch, Route, useParams } from "react-router-dom";
import styles from "./reacts.module.css";
import { useRef } from "react/cjs/react.development";

const Reacts = ({ reacts }) => {
  const initialBoxRef = useRef();
  const { keyValue } = useParams();
  const initialCodes = `
  <div>
    ${reacts[Object.keys(reacts).length].contents}
  </div>`;

  return (
    <>
      {!keyValue && (
        <div ref={initialBoxRef} className={styles.novelUsaEuInitialBox}>
          <div>
            <h1>{reacts[Object.keys(reacts).length].type}</h1>
            <h2>{reacts[Object.keys(reacts).length].title}</h2>
            <div dangerouslySetInnerHTML={{ __html: initialCodes }}></div>
          </div>
        </div>
      )}
      {Object.keys(reacts)
        .reverse()
        .map((key) => {
          const testStr = reacts[key].contents;
          // testStr.join("") 배열을 하나로 연결된 문자열로 바꾼다.
          let codes = `
              <div>
                <h1>${reacts[key].type}</h1>
                <h2>${reacts[key].title}</h2>
                <div>
                  ${testStr}
                </div>
              </div>`;
          return (
            <>
              <div className={styles.switchBox}>
                <Switch>
                  <Route path={`/react/${key}`}>
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
        {Object.keys(reacts)
          .reverse()
          .map((key) => {
            return (
              <li>
                <Link
                  className={styles.novelUsaEuDataList}
                  to={`/react/${key}`}
                >
                  <h4>{key}.&emsp;</h4>
                  <h4>{reacts[key].type}&nbsp;-&nbsp;</h4>
                  <h4>{reacts[key].title}</h4>
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default Reacts;
