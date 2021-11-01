import React from "react";
import { Link, Switch, Route, useParams } from "react-router-dom";
import styles from "./fiji.module.css";
import { useRef } from "react/cjs/react.development";

const Fiji = ({ fijis }) => {
  const initialBoxRef = useRef();
  const { keyValue } = useParams();
  const initialCodes = `
    <div>
      ${fijis[fijis.length - 1].contents}
    </div>`;

  return (
    <>
      {!keyValue && (
        <div ref={initialBoxRef} className={styles.novelUsaEuInitialBox}>
          <div>
            <h1>{fijis[fijis.length - 1].type}</h1>
            <h2>{fijis[fijis.length - 1].title}</h2>
            <div dangerouslySetInnerHTML={{ __html: initialCodes }}></div>
          </div>
        </div>
      )}
      {Object.keys(fijis)
        .reverse()
        .map((key) => {
          const testStr = fijis[key].contents;
          // testStr.join("") 배열을 하나로 연결된 문자열로 바꾼다.
          let codes = `
              <div>
                <h1>${fijis[key].type}</h1>
                <h2>${fijis[key].title}</h2>
                <div>
                  ${testStr}
                </div>
              </div>`;
          return (
            <>
              <div className={styles.switchBox}>
                <Switch>
                  <Route path={`/fiji/${fijis[key].id}`}>
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
        {Object.keys(fijis)
          .reverse()
          .map((key) => {
            return (
              <li>
                <Link
                  className={styles.novelUsaEuDataList}
                  to={`/fiji/${fijis[key].id}`}
                >
                  <h4>{fijis[key].id}.&emsp;</h4>
                  <h4>{fijis[key].type}&nbsp;-&nbsp;</h4>
                  <h4>{fijis[key].title}</h4>
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default Fiji;
