'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import styles from './page.module.scss';
import Image from 'next/image';
import Button from 'src/common/Button/Button';

// ReferenceError: self is not defined 에러
// Tui Editor 자체가 서버사이드 렌더링이 아니라 브라우저 렌더링이기 때문에
// self는 브라우저 환경에서 전역개체인 window객체를 가르키는 말.
// 즉 서버사이드 렌더링시 브라우저 환경이 아니기 떄문에 dynamic import를 통해서
// 브라우저 환경에 접속하고 난 다음 import 시켜줘야 에러가 발생하지 않음.
const DynamicEditor = dynamic(() => import('src/components/Write/Editor/Editor'), { ssr: false });

const Write = () => {
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
            <Image src="/imgs/aboutMeBg.jpg" alt="main_img" fill objectFit="contain" />
          </div>
          <div className={styles.titleInputMainImgBox}>
            <button type="button" className={styles.mainImgUploadBtn}>
              <Image src="/svg/image-solid.svg" alt="image_upload" fill />
            </button>
            <input className={styles.inputTitle} type="text" placeholder="Title..." />
            <Button href="" width="5rem" height="2.5rem" className={styles.publish} text="publish" />
          </div>
        </>
      ) : (
        <div></div>
      )}
      <DynamicEditor getShowEditorBoolean={getShowEditorBoolean} />
    </section>
  );
};

export default Write;
