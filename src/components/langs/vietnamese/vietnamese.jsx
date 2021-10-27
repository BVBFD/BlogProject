import React from "react";
import { Link, Switch, Route, useParams } from "react-router-dom";
import styles from "./vietnamese.module.css";
import { useRef } from "react/cjs/react.development";

const Vietnamese = ({ vietnameses }) => {
  const initialBoxRef = useRef();
  const { keyValue } = useParams();

  return (
    <>
      {!keyValue && (
        <div ref={initialBoxRef} className={styles.novelUsaEuInitialBox}>
          <div>
            <h1>{vietnameses[Object.keys(vietnameses).length].type}</h1>
            <h2>{vietnameses[Object.keys(vietnameses).length].title}</h2>
            <div>
              {vietnameses[
                Object.keys(vietnameses).length
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
      {Object.keys(vietnameses)
        .reverse()
        .map((key) => {
          const testStr = vietnameses[key].contents.props.children.map(
            (str) => {
              if (str.type !== "br") {
                return str;
              }
              if (str.type === "br") {
                return "<br></br>";
              }
            }
          );
          // testStr.join("") 배열을 하나로 연결된 문자열로 바꾼다.
          let codes = `
              <div>
                <h1>${vietnameses[key].type}</h1>
                <h2>${vietnameses[key].title}</h2>
                <div>
                  ${testStr.join("")}
                </div>
              </div>`;
          return (
            <>
              <div className={styles.switchBox}>
                <Switch>
                  <Route path={`/vietnamese/${key}`}>
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
                  to={`/vietnamese/${key}`}
                >
                  <h4>{key}.&emsp;</h4>
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
