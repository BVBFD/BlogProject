import React, { useEffect } from 'react';
import { Image } from 'antd';
import styles from './index.module.scss';
import Overlay from '../Overlay';
import { PopUpPropsType } from '../common';

const PopUp = ({
  title,
  content,
  maxWidth,
  onClose,
  footer,
  popUpCustomCSSContainer,
  isCloseIcon,
  closeIconLocation,
}: PopUpPropsType) => {
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
              <Image alt="icon_close" className={styles.closeIconImg} src="/icons/icon_x_18.svg" />
            </div>
          </button>
        )}
        <header className={styles.modalHeader}>
          <div className={styles.title}>{title}</div>
        </header>
        <main className={styles.modalContentMain}>{content}</main>
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
