'use client';

import React, { useContext, useEffect, useRef } from 'react';
import Typed from 'typed.js';
import { ThemeContext } from 'src/common/context/ThemeContext';
import styles from './Typedjs.module.scss';

type TypedjsPropsType = {
  strings: string[];
  handleOnComplete: () => Record<string, never> | void;
};

const Typedjs = ({ strings, handleOnComplete }: TypedjsPropsType) => {
  const { mode } = useContext(ThemeContext);
  const typedjsRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedjsRef.current, {
      strings,
      showCursor: false,
      typeSpeed: 15,
      backSpeed: 15,
      onComplete: handleOnComplete,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div
      className={styles.typedjsStrings}
      ref={typedjsRef}
      style={mode === 'light' ? { textShadow: '4px 4px 8px black' } : { textShadow: '4px 4px 8px white' }}
    />
  );
};

export default Typedjs;
