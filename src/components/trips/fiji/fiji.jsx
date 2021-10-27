import React from "react";
import { Link, Switch, Route, useParams } from "react-router-dom";
import styles from "./fiji.module.css";
import { useRef } from "react/cjs/react.development";

const Fiji = ({ fijis }) => {
  const initialBoxRef = useRef();
  const { keyValue } = useParams();

  return (
    <>
      {!keyValue && (
        <div ref={initialBoxRef} className={styles.novelUsaEuInitialBox}>
          <div>
            <h1>{fijis[Object.keys(fijis).length].type}</h1>
            <h2>{fijis[Object.keys(fijis).length].title}</h2>
            <div>
              {fijis[Object.keys(fijis).length].contents.props.children.map(
                (str) => {
                  if (str.type !== "br") {
                    return str;
                  }
                  if (str.type === "br") {
                    return (
                      <>
                        <br></br>
                        <br></br>
                      </>
                    );
                  }
                }
              )}
            </div>
          </div>
        </div>
      )}
      {Object.keys(fijis)
        .reverse()
        .map((key) => {
          const testStr = fijis[key].contents.props.children.map((str) => {
            if (str.type !== "br") {
              return str;
            }
            if (str.type === "br") {
              return "<br></br>";
            }
          });
          // testStr.join("") 배열을 하나로 연결된 문자열로 바꾼다.
          let codes = `
              <div>
                <h1>${fijis[key].type}</h1>
                <h2>${fijis[key].title}</h2>
                <div>
                  ${testStr.join("")}
                </div>
              </div>`;
          return (
            <>
              <div className={styles.switchBox}>
                <Switch>
                  <Route path={`/fiji/${key}`}>
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
                <Link className={styles.novelUsaEuDataList} to={`/fiji/${key}`}>
                  <h4>{key}.&emsp;</h4>
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
