import React from "react";
import { Link, Switch, Route, useParams } from "react-router-dom";
import styles from "./classicWestern.module.css";
import { useRef } from "react/cjs/react.development";

const ClassicWestern = ({ classicWestern }) => {
  const initialBoxRef = useRef();
  const { keyValue } = useParams();
  const initialCodes = `
    <div>
      ${classicWestern[classicWestern.length - 1].contents}
    </div>`;

  return (
    <>
      {!keyValue && (
        <div ref={initialBoxRef} className={styles.novelUsaEuInitialBox}>
          <div>
            <h1>{classicWestern[classicWestern.length - 1].type}</h1>
            <h2>{classicWestern[classicWestern.length - 1].title}</h2>
            <div dangerouslySetInnerHTML={{ __html: initialCodes }}></div>
          </div>
        </div>
      )}
      {Object.keys(classicWestern)
        .reverse()
        .map((key) => {
          const testStr = classicWestern[key].contents;
          // testStr.join("") 배열을 하나로 연결된 문자열로 바꾼다.
          let codes = `
              <div>
                <h1>${classicWestern[key].type}</h1>
                <h2>${classicWestern[key].title}</h2>
                <div>
                  ${testStr}
                </div>
              </div>`;
          return (
            <>
              <div className={styles.switchBox}>
                <Switch>
                  <Route path={`/classicWestern/${classicWestern[key].id}`}>
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
        {Object.keys(classicWestern)
          .reverse()
          .map((key) => {
            return (
              <li>
                <Link
                  className={styles.novelUsaEuDataList}
                  to={`/classicWestern/${classicWestern[key].id}`}
                >
                  <h4>{classicWestern[key].id}.&emsp;</h4>
                  <h4>{classicWestern[key].type}&nbsp;-&nbsp;</h4>
                  <h4>{classicWestern[key].title}</h4>
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default ClassicWestern;
