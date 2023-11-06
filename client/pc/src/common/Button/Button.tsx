import Link from 'next/link';
import React from 'react';

import styles from './Button.module.scss';

type ButtonPropsType = {
  className?: string;
  href: string;
  text: string;
  width: string;
  height: string;
  fontSize?: string;
  openInNewTab?: boolean;
};

const Button = ({ className, href, text, width, height, fontSize, openInNewTab }: ButtonPropsType) => {
  return (
    <Link className={`${className} ${styles.button}`} href={href} target={openInNewTab ? '_blank' : '_self'}>
      <button style={{ width: `${width}`, height: `${height}`, fontSize: `${fontSize}` }} type="button">
        {text}
      </button>
    </Link>
  );
};

Button.defaultProps = {
  className: '',
  fontSize: '1rem',
  openInNewTab: false,
};

export default Button;
