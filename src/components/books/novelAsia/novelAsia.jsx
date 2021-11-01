import React from "react";
import { Link, Switch, Route, useParams } from "react-router-dom";
import styles from "./novelAsia.module.css";
import { useRef } from "react/cjs/react.development";

const NovelAsia = ({ novelAsiaData }) => {
  const initialBoxRef = useRef();
  const { keyValue } = useParams();
  const initialCodes = `
    <div>
      ${novelAsiaData[novelAsiaData.length - 1].contents}
    </div>`;

  return (
    <>
      {!keyValue && (
        <div ref={initialBoxRef} className={styles.novelUsaEuInitialBox}>
          <div>
            <h1>{novelAsiaData[novelAsiaData.length - 1].type}</h1>
            <h2>{novelAsiaData[novelAsiaData.length - 1].title}</h2>
            <div dangerouslySetInnerHTML={{ __html: initialCodes }}></div>
          </div>
        </div>
      )}
      {Object.keys(novelAsiaData)
        .reverse()
        .map((key) => {
          const testStr = novelAsiaData[key].contents;
          // testStr.join("") 배열을 하나로 연결된 문자열로 바꾼다.
          let codes = `
              <div>
                <h1>${novelAsiaData[key].type}</h1>
                <h2>${novelAsiaData[key].title}</h2>
                <div>
                  ${testStr}
                </div>
              </div>`;
          return (
            <>
              <div className={styles.switchBox}>
                <Switch>
                  <Route path={`/novelAsia/${novelAsiaData[key].id}`}>
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
        {Object.keys(novelAsiaData)
          .reverse()
          .map((key) => {
            return (
              <li>
                <Link
                  className={styles.novelUsaEuDataList}
                  to={`/novelAsia/${novelAsiaData[key].id}`}
                >
                  <h4>{novelAsiaData[key].id}.&emsp;</h4>
                  <h4>{novelAsiaData[key].type}&nbsp;-&nbsp;</h4>
                  <h4>{novelAsiaData[key].title}</h4>
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default NovelAsia;
