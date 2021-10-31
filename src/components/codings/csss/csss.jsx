import React from "react";
import { Link, Switch, Route, useParams } from "react-router-dom";
import styles from "./csss.module.css";
import { useRef } from "react/cjs/react.development";

const Csss = ({ csss }) => {
  const initialBoxRef = useRef();
  const { keyValue } = useParams();
  const initialCodes = `
    <div>
      ${csss[Object.keys(csss).length].contents}
    </div>`;

  return (
    <>
      {!keyValue && (
        <div ref={initialBoxRef} className={styles.novelUsaEuInitialBox}>
          <div>
            <h1>{csss[Object.keys(csss).length].type}</h1>
            <h2>{csss[Object.keys(csss).length].title}</h2>
            <div dangerouslySetInnerHTML={{ __html: initialCodes }}></div>
          </div>
        </div>
      )}
      {Object.keys(csss)
        .reverse()
        .map((key) => {
          const testStr = csss[key].contents;
          // testStr.join("") 배열을 하나로 연결된 문자열로 바꾼다.
          let codes = `
              <div>
                <h1>${csss[key].type}</h1>
                <h2>${csss[key].title}</h2>
                <div>
                  ${testStr}
                </div>
              </div>`;
          return (
            <>
              <div className={styles.switchBox}>
                <Switch>
                  <Route path={`/css/${key}`}>
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
        {Object.keys(csss)
          .reverse()
          .map((key) => {
            return (
              <li>
                <Link className={styles.novelUsaEuDataList} to={`/css/${key}`}>
                  <h4>{key}.&emsp;</h4>
                  <h4>{csss[key].type}&nbsp;-&nbsp;</h4>
                  <h4>{csss[key].title}</h4>
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default Csss;
