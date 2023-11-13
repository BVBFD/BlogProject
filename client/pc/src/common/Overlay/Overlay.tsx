import React from 'react';
import styles from './Overlay.module.scss';

const Overlay = ({ children }) => {
  return <div className={styles.modalOverlay}>{children}</div>;
};

export default Overlay;
