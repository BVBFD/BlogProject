import React from 'react';
import { Button } from 'antd';
import styles from './index.module.scss';
import { BasicButtonProps } from '../common';

const BasicButton = ({ children, size, type, disabled, onClick, icon, BasicButtonType }: BasicButtonProps) => {
  const combinedClassName = () => {
    switch (BasicButtonType) {
      case 'primary':
        return `${styles.btn} ${styles.primary}`;
      case 'small':
        return `${styles.btn} ${styles.small}`;
      case 'medium':
        return `${styles.btn} ${styles.medium}`;
      default:
        return `${styles.btn}`;
    }
  };

  return (
    <Button
      className={`${combinedClassName()}`}
      disabled={disabled}
      icon={icon}
      onClick={onClick}
      size={size}
      type={type}
    >
      {children}
    </Button>
  );
};

BasicButton.defaultProps = {
  BasicButtonType: 'primary',
};

export default BasicButton;
