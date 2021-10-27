import React from "react";
import { Link, Switch, Route, useParams } from "react-router-dom";
import styles from "./china.module.css";
import { useRef } from "react/cjs/react.development";

const China = ({ chinas }) => {
  const initialBoxRef = useRef();
  const { keyValue } = useParams();

  return (
    <>
      {!keyValue && (
        <div ref={initialBoxRef} className={styles.novelUsaEuInitialBox}>
          <div>
            <h1>{chinas[Object.keys(chinas).length].type}</h1>
            <h2>{chinas[Object.keys(chinas).length].title}</h2>
            <div>
              {chinas[Object.keys(chinas).length].contents.props.children.map(
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
      {Object.keys(chinas)
        .reverse()
        .map((key) => {
          const testStr = chinas[key].contents.props.children.map((str) => {
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
                <h1>${chinas[key].type}</h1>
                <h2>${chinas[key].title}</h2>
                <div>
                  ${testStr.join("")}
                </div>
              </div>`;
          return (
            <>
              <div className={styles.switchBox}>
                <Switch>
                  <Route path={`/china/${key}`}>
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
        {Object.keys(chinas)
          .reverse()
          .map((key) => {
            return (
              <li>
                <Link
                  className={styles.novelUsaEuDataList}
                  to={`/china/${key}`}
                >
                  <h4>{key}.&emsp;</h4>
                  <h4>{chinas[key].type}&nbsp;-&nbsp;</h4>
                  <h4>{chinas[key].title}</h4>
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default China;
