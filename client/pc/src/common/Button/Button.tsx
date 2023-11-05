import Link from 'next/link';
import React from 'react';

import styles from './Button.module.scss';

type ButtonPropsType = {
  href: string;
  text: string;
  width: string;
  height: string;
};

const Button = ({ href, text, width, height }: ButtonPropsType) => {
  return (
    <Link className={styles.button} href={href}>
      <button type="button" style={{ width: `${width}`, height: `${height}` }}>
        {text}
      </button>
    </Link>
  );
};

export default Button;
