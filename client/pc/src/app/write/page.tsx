import React from 'react';
import dynamic from 'next/dynamic';
import styles from './page.module.scss';

const DynamicEditor = dynamic(() => import('src/components/Write/Editor/Editor'), { ssr: false });

const Write = () => {
  return (
    <section className={styles.container}>
      <span>write</span>
      <DynamicEditor />
    </section>
  );
};

export default Write;
