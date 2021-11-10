import React from "react";
import styles from "./initialPageData.module.css";
import { Link } from "react-router-dom";

const InitialPageData = ({ datas }) => {
  return datas.map((val) => {
    if (val.id.slice(-1) === "a") {
      return (
        <>
          <h2>{val.id.slice(0, 1).toUpperCase() + val.id.slice(1)}</h2>
          <li className={styles.novelUsaEuDataList}>
            {val.data
              .slice(0)
              .reverse()
              .map((dt) => {
                return (
                  <Link
                    className={styles.novelUsaEuDataLink}
                    to={`/${val.id.slice(0, -4)}/${dt.id}`}
                  >
                    <h4>{dt.id}.&emsp;</h4>
                    <h4>{dt.type}&nbsp;-&nbsp;</h4>
                    <h4>{dt.title}</h4>
                  </Link>
                );
              })}
          </li>
        </>
      );
    }
    if (val.id.slice(-1) === "s") {
      return (
        <>
          <h2>
            {(val.id.slice(0, 1).toUpperCase() + val.id.slice(1)).slice(0, -1)}
          </h2>
          <li className={styles.novelUsaEuDataList}>
            {val.data
              .slice(0)
              .reverse()
              .map((dt) => {
                return (
                  <Link
                    className={styles.novelUsaEuDataLink}
                    to={`/${val.id.slice(0, -1)}/${dt.id}`}
                  >
                    <h4>{dt.id}.&emsp;</h4>
                    <h4>{dt.type}&nbsp;-&nbsp;</h4>
                    <h4>{dt.title}</h4>
                  </Link>
                );
              })}
          </li>
        </>
      );
    }
  });
};

export default InitialPageData;
