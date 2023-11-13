'use client';

import React, { useEffect } from 'react';
import styles from './PopUp.module.scss';
import Overlay from '../Overlay/Overlay';
import CustomScroll from '../CustomScroll/CustomScroll';
import Image from 'next/image';

const PopUp = ({
  title,
  content,
  maxWidth,
  onClose,
  footer,
  popUpCustomCSSContainer,
  isCloseIcon,
  closeIconLocation,
}) => {
  useEffect(() => {
    const body = document.querySelector('body');
    if (body) {
      body.style.overflowY = 'hidden';
    }

    return () => {
      if (body) {
        body.style.overflowY = 'auto';
      }
    };
  }, []);

  return (
    <Overlay>
      <article
        className={`${styles.popUpContainer} ${popUpCustomCSSContainer} relative`}
        onClick={(e) => {
          e.stopPropagation();
        }}
        role="presentation"
        style={{ maxWidth: `${maxWidth !== undefined ? `${maxWidth}px` : 'fit-content'}` }}
      >
        {isCloseIcon && (
          <button
            className={`${styles.closeImgButton} absolute`}
            onClick={onClose}
            onKeyPress={onClose}
            style={{
              top: `${closeIconLocation?.top}px`,
              bottom: `${closeIconLocation?.bottom}px`,
              right: `${closeIconLocation?.right}px`,
              left: `${closeIconLocation?.left}px`,
            }}
            tabIndex={0}
            type="button"
          >
            <div style={{ pointerEvents: 'none' }}>
              <Image alt="icon_close" className={styles.closeIconImg} src="/svg/icon_x_18.svg" fill />
            </div>
          </button>
        )}
        <header className={styles.modalHeader}>
          <div className={styles.title}>{title}</div>
        </header>
        <CustomScroll>{content}</CustomScroll>
        {!footer ? null : <footer>{footer}</footer>}
      </article>
    </Overlay>
  );
};

PopUp.defaultProps = {
  maxWidth: undefined,
  onClose: undefined,
  footer: undefined,
  popUpCustomCSSContainer: undefined,
  isCloseIcon: true,
  closeIconLocation: {
    top: undefined,
    bottom: undefined,
    left: undefined,
    right: undefined,
  },
};

export default PopUp;
