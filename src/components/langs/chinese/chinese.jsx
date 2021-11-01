import React from "react";
import { Link, Switch, Route, useParams } from "react-router-dom";
import styles from "./chinese.module.css";
import { useRef } from "react/cjs/react.development";

const Chinese = ({ chineses }) => {
  const initialBoxRef = useRef();
  const { keyValue } = useParams();
  const initialCodes = `
    <div>
      ${chineses[chineses.length - 1].contents}
    </div>`;

  return (
    <>
      {!keyValue && (
        <div ref={initialBoxRef} className={styles.novelUsaEuInitialBox}>
          <div>
            <h1>{chineses[chineses.length - 1].type}</h1>
            <h2>{chineses[chineses.length - 1].title}</h2>
            <div dangerouslySetInnerHTML={{ __html: initialCodes }}></div>
          </div>
        </div>
      )}
      {Object.keys(chineses)
        .reverse()
        .map((key) => {
          const testStr = chineses[key].contents;
          // testStr.join("") 배열을 하나로 연결된 문자열로 바꾼다.
          let codes = `
              <div>
                <h1>${chineses[key].type}</h1>
                <h2>${chineses[key].title}</h2>
                <div>
                  ${testStr}
                </div>
              </div>`;
          return (
            <>
              <div className={styles.switchBox}>
                <Switch>
                  <Route path={`/chinese/${chineses[key].id}`}>
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
        {Object.keys(chineses)
          .reverse()
          .map((key) => {
            return (
              <li>
                <Link
                  className={styles.novelUsaEuDataList}
                  to={`/chinese/${chineses[key].id}`}
                >
                  <h4>{chineses[key].id}.&emsp;</h4>
                  <h4>{chineses[key].type}&nbsp;-&nbsp;</h4>
                  <h4>{chineses[key].title}</h4>
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default Chinese;
