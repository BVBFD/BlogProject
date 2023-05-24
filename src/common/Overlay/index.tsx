import React from 'react';
import styles from './index.module.scss';
import { OverlayPropsType } from '../common';

const Overlay = ({ children, onClick, zIndex }: OverlayPropsType) => {
  return (
    <div className={`${styles.modalOverlay} z-[${zIndex}]`} onClick={onClick} role="presentation">
      {children}
    </div>
  );
};

Overlay.defaultProps = {
  children: undefined,
  onClick: undefined,
  zIndex: 999999,
};

export default Overlay;
