import React from "react";
import { Link, Switch, Route, useParams } from "react-router-dom";
import styles from "./nodeJs.module.css";
import { useRef } from "react/cjs/react.development";

const NodeJs = ({ nodeJSs }) => {
  const initialBoxRef = useRef();
  const { keyValue } = useParams();

  return (
    <>
      {!keyValue && (
        <div ref={initialBoxRef} className={styles.novelUsaEuInitialBox}>
          <div>
            <h1>{nodeJSs[Object.keys(nodeJSs).length].type}</h1>
            <h2>{nodeJSs[Object.keys(nodeJSs).length].title}</h2>
            <div>
              {nodeJSs[Object.keys(nodeJSs).length].contents.props.children.map(
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
      {Object.keys(nodeJSs)
        .reverse()
        .map((key) => {
          const testStr = nodeJSs[key].contents.props.children.map((str) => {
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
                <h1>${nodeJSs[key].type}</h1>
                <h2>${nodeJSs[key].title}</h2>
                <div>
                  ${testStr.join("")}
                </div>
              </div>`;
          return (
            <>
              <div className={styles.switchBox}>
                <Switch>
                  <Route path={`/nodejs/${key}`}>
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
        {Object.keys(nodeJSs)
          .reverse()
          .map((key) => {
            return (
              <li>
                <Link
                  className={styles.novelUsaEuDataList}
                  to={`/nodejs/${key}`}
                >
                  <h4>{key}.&emsp;</h4>
                  <h4>{nodeJSs[key].type}&nbsp;-&nbsp;</h4>
                  <h4>{nodeJSs[key].title}</h4>
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default NodeJs;
