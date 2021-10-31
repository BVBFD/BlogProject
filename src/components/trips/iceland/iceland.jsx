import React from "react";
import { Link, Switch, Route, useParams } from "react-router-dom";
import styles from "./iceland.module.css";
import { useRef } from "react/cjs/react.development";

const Iceland = ({ icelands }) => {
  const initialBoxRef = useRef();
  const { keyValue } = useParams();
  const initialCodes = `
  <div>
    ${icelands[Object.keys(icelands).length].contents}
  </div>`;

  return (
    <>
      {!keyValue && (
        <div ref={initialBoxRef} className={styles.novelUsaEuInitialBox}>
          <div>
            <h1>{icelands[Object.keys(icelands).length].type}</h1>
            <h2>{icelands[Object.keys(icelands).length].title}</h2>
            <div dangerouslySetInnerHTML={{ __html: initialCodes }}></div>
          </div>
        </div>
      )}
      {Object.keys(icelands)
        .reverse()
        .map((key) => {
          const testStr = icelands[key].contents;
          // testStr.join("") 배열을 하나로 연결된 문자열로 바꾼다.
          let codes = `
              <div>
                <h1>${icelands[key].type}</h1>
                <h2>${icelands[key].title}</h2>
                <div>
                  ${testStr}
                </div>
              </div>`;
          return (
            <>
              <div className={styles.switchBox}>
                <Switch>
                  <Route path={`/iceland/${key}`}>
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
        {Object.keys(icelands)
          .reverse()
          .map((key) => {
            return (
              <li>
                <Link
                  className={styles.novelUsaEuDataList}
                  to={`/iceland/${key}`}
                >
                  <h4>{key}.&emsp;</h4>
                  <h4>{icelands[key].type}&nbsp;-&nbsp;</h4>
                  <h4>{icelands[key].title}</h4>
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default Iceland;
