import React from "react";
import { Link, Switch, Route, useParams } from "react-router-dom";
import styles from "./vietnam.module.css";
import { useRef } from "react/cjs/react.development";

const Vietnam = ({ vietnams }) => {
  const initialBoxRef = useRef();
  const { keyValue } = useParams();

  return (
    <>
      {!keyValue && (
        <div ref={initialBoxRef} className={styles.novelUsaEuInitialBox}>
          <div>
            <h1>{vietnams[Object.keys(vietnams).length].type}</h1>
            <h2>{vietnams[Object.keys(vietnams).length].title}</h2>
            <div>
              {vietnams[
                Object.keys(vietnams).length
              ].contents.props.children.map((str) => {
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
              })}
            </div>
          </div>
        </div>
      )}
      {Object.keys(vietnams)
        .reverse()
        .map((key) => {
          const testStr = vietnams[key].contents.props.children.map((str) => {
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
                <h1>${vietnams[key].type}</h1>
                <h2>${vietnams[key].title}</h2>
                <div>
                  ${testStr.join("")}
                </div>
              </div>`;
          return (
            <>
              <div className={styles.switchBox}>
                <Switch>
                  <Route path={`/vietnam/${key}`}>
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
                  to={`/vietnam/${key}`}
                >
                  <h4>{key}.&emsp;</h4>
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
