import React from "react";
import styles from "./initialPageData.module.css";
import { Link, Switch, Route } from "react-router-dom";

const InitialPageData = ({ totalData }) => {
  console.log(totalData);
  return (
    <ul className={styles.novelUsaEuDataUlBox}>
      {Object.keys(totalData).map((key) => {
        return (
          <li>
            <h2>{`->` + key.slice(0, 1).toUpperCase() + key.slice(1)}</h2>
            {Object.keys(totalData[key])
              .reverse()
              .map((key2) => {
                return (
                  <>
                    <Link
                      className={styles.novelUsaEuDataList}
                      to={`/${key}/${totalData[key][key2].id}`}
                    >
                      <h4>{totalData[key][key2].id}.&emsp;</h4>
                      <h4>{totalData[key][key2].type}&nbsp;-&nbsp;</h4>
                      <h4>{totalData[key][key2].title}</h4>
                    </Link>
                    <Switch>
                      <Route
                        path={`/${key}/${totalData[key][key2].id}`}
                      ></Route>
                    </Switch>
                  </>
                );
              })}
          </li>
        );
      })}
    </ul>
  );
};

export default InitialPageData;
