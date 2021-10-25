import React, { useRef } from "react";
import { Link, Switch, Route } from "react-router-dom";
import styles from "./novelUsaEu.module.css";

const NovelUsaEu = ({ novelUsaEuData }) => {
  return (
    <>
      {Object.keys(novelUsaEuData)
        .reverse()
        .map((key) => {
          let codes = `
              <div>
                <h1>${novelUsaEuData[key].type}</h1>
                <h2>${novelUsaEuData[key].title}</h2>
                <div>
                  ${novelUsaEuData[key].contents.props.children[0]}
                  <${novelUsaEuData[key].contents.props.children[1].type}>
                  <${novelUsaEuData[key].contents.props.children[2].type}>
                  ${novelUsaEuData[key].contents.props.children[3]}
                </div>
              </div>`;
          return (
            <>
              <div className={styles.switchBox}>
                <Switch>
                  <Route path={`/novelUsaEU/${key}`}>
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
        {Object.keys(novelUsaEuData)
          .reverse()
          .map((key) => {
            return (
              <li>
                <Link
                  className={styles.novelUsaEuDataList}
                  to={`/novelUsaEU/${key}`}
                >
                  <h4>{key}.&emsp;</h4>
                  <h4>{novelUsaEuData[key].type}&nbsp;-&nbsp;</h4>
                  <h4>{novelUsaEuData[key].title}</h4>
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default NovelUsaEu;
