import React from 'react';
import { Pagination } from 'antd';
import type { PaginationProps } from 'antd';
import styles from './index.module.scss';

interface BasicPaginationProps extends PaginationProps {
  total: number;
  current: number;
  defaultCurrent: number;
  pageSize: number;
  onChange: PaginationProps['onChange'];
  showSizeChanger?: boolean;
}

const BasicPagination = ({
  total,
  current,
  defaultCurrent,
  pageSize,
  onChange,
  showSizeChanger,
}: BasicPaginationProps) => {
  return (
    <div className={styles.paginationContainer}>
      <Pagination
        current={current}
        defaultCurrent={defaultCurrent}
        onChange={onChange}
        pageSize={pageSize}
        showSizeChanger={showSizeChanger}
        size="small"
        total={total}
      />
    </div>
  );
};

BasicPagination.defaultProps = {
  showSizeChanger: false,
};

export default BasicPagination;
