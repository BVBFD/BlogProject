import React from "react";
import { Link, Switch, Route, useParams } from "react-router-dom";
import styles from "./vietnam.module.css";
import { useRef } from "react/cjs/react.development";

const Vietnam = ({ vietnams }) => {
  const initialBoxRef = useRef();
  const { keyValue } = useParams();
  const initialCodes = `
    <div>
      ${vietnams[vietnams.length - 1].contents}
    </div>`;

  return (
    <>
      {!keyValue && (
        <div ref={initialBoxRef} className={styles.novelUsaEuInitialBox}>
          <div>
            <h1>{vietnams[vietnams.length - 1].type}</h1>
            <h2>{vietnams[vietnams.length - 1].title}</h2>
            <div dangerouslySetInnerHTML={{ __html: initialCodes }}></div>
          </div>
        </div>
      )}
      {Object.keys(vietnams)
        .reverse()
        .map((key) => {
          const testStr = vietnams[key].contents;
          // testStr.join("") 배열을 하나로 연결된 문자열로 바꾼다.
          let codes = `
              <div>
                <h1>${vietnams[key].type}</h1>
                <h2>${vietnams[key].title}</h2>
                <div>
                  ${testStr}
                </div>
              </div>`;
          return (
            <>
              <div className={styles.switchBox}>
                <Switch>
                  <Route path={`/vietnam/${vietnams[key].id}`}>
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
        {Object.keys(vietnams)
          .reverse()
          .map((key) => {
            return (
              <li>
                <Link
                  className={styles.novelUsaEuDataList}
                  to={`/vietnam/${vietnams[key].id}`}
                >
                  <h4>{vietnams[key].id}.&emsp;</h4>
                  <h4>{vietnams[key].type}&nbsp;-&nbsp;</h4>
                  <h4>{vietnams[key].title}</h4>
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default Vietnam;
