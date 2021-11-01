import React from "react";
import { Link, Switch, Route, useParams } from "react-router-dom";
import styles from "./vietnamese.module.css";
import { useRef } from "react/cjs/react.development";

const Vietnamese = ({ vietnameses }) => {
  const initialBoxRef = useRef();
  const { keyValue } = useParams();
  const initialCodes = `
    <div>
      ${vietnameses[vietnameses.length - 1].contents}
    </div>`;

  return (
    <>
      {!keyValue && (
        <div ref={initialBoxRef} className={styles.novelUsaEuInitialBox}>
          <div>
            <h1>{vietnameses[vietnameses.length - 1].type}</h1>
            <h2>{vietnameses[vietnameses.length - 1].title}</h2>
            <div dangerouslySetInnerHTML={{ __html: initialCodes }}></div>
          </div>
        </div>
      )}
      {Object.keys(vietnameses)
        .reverse()
        .map((key) => {
          const testStr = vietnameses[key].contents;
          // testStr.join("") 배열을 하나로 연결된 문자열로 바꾼다.
          let codes = `
              <div>
                <h1>${vietnameses[key].type}</h1>
                <h2>${vietnameses[key].title}</h2>
                <div>
                  ${testStr}
                </div>
              </div>`;
          return (
            <>
              <div className={styles.switchBox}>
                <Switch>
                  <Route path={`/vietnamese/${vietnameses[key].id}`}>
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
        {Object.keys(vietnameses)
          .reverse()
          .map((key) => {
            return (
              <li>
                <Link
                  className={styles.novelUsaEuDataList}
                  to={`/vietnamese/${vietnameses[key].id}`}
                >
                  <h4>{vietnameses[key].id}.&emsp;</h4>
                  <h4>{vietnameses[key].type}&nbsp;-&nbsp;</h4>
                  <h4>{vietnameses[key].title}</h4>
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default Vietnamese;
