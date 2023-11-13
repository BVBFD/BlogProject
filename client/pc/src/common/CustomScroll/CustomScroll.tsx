import React from 'react';

import styles from './CustomScroll.module.scss';

const CustomScroll = ({
  children,
  className,
  maxHeight,
  paddingTop,
  paddingBottom,
  paddingRight,
  paddingLeft,
  marginTop,
  marginBottom,
  marginRight,
  marginLeft,
}) => {
  return (
    <div
      className={`${styles.customScroll} ${className} pt-[${paddingTop}px] pb-[${paddingBottom}px] pl-[${paddingLeft}px] pr-[${paddingRight}px] mt-[${marginTop}px] mb-[${marginBottom}px] ml-[${marginLeft}px] mr-[${marginRight}px]`}
      style={{ maxHeight: `${maxHeight}px` }}
    >
      {children}
    </div>
  );
};

CustomScroll.defaultProps = {
  className: undefined,
  maxHeight: 'fitContent',
  paddingTop: 15,
  paddingBottom: 15,
  paddingRight: 15,
  paddingLeft: 15,
  marginTop: 15,
  marginBottom: 15,
  marginRight: 15,
  marginLeft: 15,
};

export default CustomScroll;
