import React from "react";
import styles from "./initialPageData.module.css";
import { Link, Switch, Route } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";

const InitialPageData = () => {
  return (
    <ul className={styles.novelUsaEuDataUlBox}>
      <li>
        <h2>Hello</h2>
      </li>
    </ul>
  );
};

export default InitialPageData;
