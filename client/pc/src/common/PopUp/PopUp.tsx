'use client';

import React, { useContext, useEffect } from 'react';
import Image from 'next/image';

import Overlay from '../Overlay/Overlay';
import CustomScroll from '../CustomScroll/CustomScroll';
import { ThemeContext } from '../context/ThemeContext';

import styles from './PopUp.module.scss';

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
  const { mode } = useContext(ThemeContext);

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
        style={
          mode === 'light'
            ? { maxWidth: `${maxWidth !== undefined ? `${maxWidth}px` : 'fit-content'}` }
            : {
                maxWidth: `${maxWidth !== undefined ? `${maxWidth}px` : 'fit-content'}`,
                color: 'white',
                backgroundColor: 'black',
                border: '2px solid white',
              }
        }
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
            <div>
              <Image alt="icon_close" className={styles.closeIconImg} fill src="svg/close-button.svg" />
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
