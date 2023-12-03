'use client';

import React, { useContext, useEffect, useState } from 'react';

import { ThemeContext } from '../context/ThemeContext';

import styles from './Pagination.module.scss';

const Pagination = ({ data, getCurrentPage }) => {
  const { mode } = useContext(ThemeContext);
  const [totalPage, setTotalPage] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showPageNumber, setShowPageNumber] = useState<number>(5);

  getCurrentPage(currentPage);

  const goToPage = (num) => {
    setCurrentPage(num);
  };

  const renderPagination = () => {
    const pageList = [];
    const startIndex = Math.floor((currentPage - 1) / showPageNumber) * showPageNumber + 1;
    const endIndex = Math.min(startIndex + (showPageNumber - 1), totalPage);

    pageList.push(
      <button
        className={mode === 'light' ? styles.toStart : `${styles.toStart} ${styles.darkMode}`}
        disabled={currentPage === 1}
        onClick={() => goToPage(1)}
        type="button"
      >
        <span>{'<<'}</span>
      </button>
    );

    pageList.push(
      <button
        className={mode === 'light' ? styles.prev : `${styles.prev} ${styles.darkMode}`}
        disabled={currentPage === 1}
        onClick={() => goToPage(currentPage - 1)}
        type="button"
      >
        <span>{'<'}</span>
      </button>
    );

    const buttonClassName = (i) => {
      let baseClassName = mode === 'light' ? styles.page : `${styles.page} ${styles.darkMode}`;

      if (i + 1 === currentPage) {
        baseClassName += ` ${styles.clicked}`;
      }

      return baseClassName;
    };

    for (let i = startIndex - 1; i < endIndex; i += 1) {
      pageList.push(
        <button
          className={buttonClassName(i)}
          disabled={i + 1 === currentPage}
          key={i + 1}
          onClick={() => goToPage(i + 1)}
          type="button"
          value={i + 1}
        >
          <span>{i + 1}</span>
        </button>
      );
    }

    pageList.push(
      <button
        className={mode === 'light' ? styles.next : `${styles.next} ${styles.darkMode}`}
        disabled={currentPage === totalPage}
        onClick={() => goToPage(currentPage + 1)}
        type="button"
      >
        <span>{'>'}</span>
      </button>
    );

    pageList.push(
      <button
        className={mode === 'light' ? styles.toEnd : `${styles.toEnd} ${styles.darkMode}`}
        disabled={currentPage === totalPage}
        onClick={() => goToPage(totalPage)}
        type="button"
      >
        <span>{'>>'}</span>
      </button>
    );

    return pageList;
  };

  useEffect(() => {
    setTotalPage(Math.ceil(data.totalPostsCount / 4));
    setShowPageNumber(5);
    setCurrentPage(1);
  }, []);

  return <li className={styles.pagination}>{renderPagination()}</li>;
};

export default Pagination;
