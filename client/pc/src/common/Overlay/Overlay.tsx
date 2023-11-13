import React from 'react';

import styles from './Overlay.module.scss';

const Overlay = ({ children, onClick, zIndex }) => {
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
