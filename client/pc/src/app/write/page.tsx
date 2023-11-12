'use client';

import React, { useContext, useState } from 'react';
import dynamic from 'next/dynamic';

import Image from 'next/image';
import Button from 'src/common/Button/Button';
import { ThemeContext } from 'src/common/context/ThemeContext';

import Select from 'src/common/Select/Select';

import styles from './page.module.scss';

// ReferenceError: self is not defined 에러
// Tui Editor 자체가 서버사이드 렌더링이 아니라 브라우저 렌더링이기 때문에
// self는 브라우저 환경에서 전역개체인 window객체를 가르키는 말.
// 즉 서버사이드 렌더링시 브라우저 환경이 아니기 떄문에 dynamic import를 통해서
// 브라우저 환경에 접속하고 난 다음 import 시켜줘야 에러가 발생하지 않음.
const DynamicEditor = dynamic(() => import('src/common/Editor/Editor'), { ssr: false });

const Write = () => {
  const { mode } = useContext(ThemeContext);
  const [toggleEditor, setToggleEditor] = useState(false);
  const getShowEditorBoolean = (showEditorBoolean: boolean) => {
    setToggleEditor(showEditorBoolean);
  };

  return (
    <section className={styles.container}>
      {/* 에디터가 늦게 렌더링되는 경향 */}
      {/* 그래서 에디터가 렌더링 되면 나머지도 렌더링 되게끔 하였음 */}
      {toggleEditor ? (
        <>
          <div className={styles.mainImgBox}>
            <Image alt="main_img" fill objectFit="contain" src="/imgs/aboutMeBg.jpg" />
          </div>
          <div className={styles.titleInputMainImgBox}>
            <button
              className={mode === 'light' ? `${styles.mainImgUploadBtn}` : `${styles.mainImgUploadBtn} ${styles.dark}`}
              type="button"
            >
              <Image
                alt="image_upload"
                fill
                objectFit="cover"
                src={mode === 'light' ? '/svg/image-regular.svg' : '/svg/image-solid.svg'}
              />
            </button>
            <input
              className={styles.inputTitle}
              placeholder="Title..."
              style={
                mode === 'light'
                  ? { color: 'black', backgroundColor: 'white' }
                  : { color: 'white', backgroundColor: 'black' }
              }
              type="text"
            />
            <Select
              height="2.5rem"
              margin="0 2rem 0 0"
              options={['HTML / GIT', 'CSS', 'JavaScript', 'TypeScript', 'Front-End', 'Back-End', 'Game', 'Book']}
              width="7.4rem"
            />
            <Button className={styles.publish} height="2.5rem" href="" text="publish" width="5rem" />
          </div>
        </>
      ) : (
        <div />
      )}
      <DynamicEditor getShowEditorBoolean={getShowEditorBoolean} />
    </section>
  );
};

export default Write;
