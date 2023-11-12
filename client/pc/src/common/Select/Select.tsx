'use client';

import React, { useContext } from 'react';

import { ThemeContext } from '../context/ThemeContext';

import styles from './Select.module.scss';

type SelectPropsType = {
  className?: string;
  height: string;
  width: string;
  margin?: string;
  padding?: string;
  options: Array<string>;
};

const Select = ({ className, height, width, margin, padding, options }: SelectPropsType) => {
  const { mode } = useContext(ThemeContext);

  return (
    <select
      className={`${className} ${styles.select}`}
      style={
        mode === 'light'
          ? { height, width, margin, padding, backgroundColor: 'rgb(34, 34, 34, 0.1)' }
          : { height, width, margin, padding, backgroundColor: '#222222' }
      }
    >
      {options.map((option) => (
        <option value={option}>{option}</option>
      ))}
    </select>
  );
};

export default Select;
