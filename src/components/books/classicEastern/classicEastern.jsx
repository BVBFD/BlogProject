import React from "react";
import { Link, Switch, Route, useParams } from "react-router-dom";
import styles from "./classicEastern.module.css";
import { useRef } from "react/cjs/react.development";

const ClassicEastern = ({ classicEastern }) => {
  const initialBoxRef = useRef();
  const { keyValue } = useParams();

  return (
    <>
      {!keyValue && (
        <div ref={initialBoxRef} className={styles.novelUsaEuInitialBox}>
          <div>
            <h1>{classicEastern[Object.keys(classicEastern).length].type}</h1>
            <h2>{classicEastern[Object.keys(classicEastern).length].title}</h2>
            <div>
              {classicEastern[
                Object.keys(classicEastern).length
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
      {Object.keys(classicEastern)
        .reverse()
        .map((key) => {
          const testStr = classicEastern[key].contents.props.children.map(
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
                <h1>${classicEastern[key].type}</h1>
                <h2>${classicEastern[key].title}</h2>
                <div>
                  ${testStr.join("")}
                </div>
              </div>`;
          return (
            <>
              <div className={styles.switchBox}>
                <Switch>
                  <Route path={`/classicEastern/${key}`}>
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
        {Object.keys(classicEastern)
          .reverse()
          .map((key) => {
            return (
              <li>
                <Link
                  className={styles.novelUsaEuDataList}
                  to={`/classicEastern/${key}`}
                >
                  <h4>{key}.&emsp;</h4>
                  <h4>{classicEastern[key].type}&nbsp;-&nbsp;</h4>
                  <h4>{classicEastern[key].title}</h4>
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default ClassicEastern;
