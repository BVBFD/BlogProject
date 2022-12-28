import dynamic from 'next/dynamic';
import Image from 'next/image';
import React, { useMemo, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import styles from '../styles/Write.module.css';
import { AddPhotoAlternate } from '@mui/icons-material';

const QuillNoSSRWrapper = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const write = () => {
  const [value, setValue] = useState<string>('');
  const [isFetching, setIsFetching] = useState<boolean>();

  const imageHandler = (e: any) => {
    console.log('imageHandler');
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.addEventListener('change', async () => {
      console.log('File OnChange!');
      // @ts-ignore
      const file = input.files[0];
      console.log(file);
    });
  };

  const videoHandler = (e: any) => {
    console.log('videoHandler');
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'video/*');
    input.click();

    input.addEventListener('change', async () => {
      console.log('File OnChange!');
      // @ts-ignore
      const file = input.files[0];
      console.log(file);
    });
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: '1' }, { header: '2' }, { font: [] }],
          [{ size: [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          ['link', 'image', 'video'],
          ['clean'],
        ],
        handlers: {
          image: imageHandler,
          video: videoHandler,
        },
      },
      clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
      },
    };
  }, []);

  /*
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
  ];

  return (
    <section className={styles.write}>
      <div className={styles.titleImgBox}>
        <Image
          src='/imgs/postdefaultimg.png'
          alt=''
          width={1920}
          height={1080}
        />
      </div>
      <form className={styles.titleImgAddBox}>
        <div className={styles.titleInputBox}>
          <div className={styles.imgFileTitleInputBox}>
            <label className={styles.imgFileLabel} htmlFor='imgFileInput'>
              <AddPhotoAlternate />
            </label>
            <input id='imgFileInput' type='file' style={{ display: 'none' }} />
            <input
              className={styles.titleInput}
              type='text'
              autoFocus={true}
              placeholder='Title'
            />
          </div>
          <div className={styles.catnameUploadBox}>
            <select name='Category' className={styles.selectCategory}>
              <option value='HTML / Git'>HTML / Git</option>
              <option value='CSS'>CSS</option>
              <option value='JavaScript'>JavaScript</option>
              <option value='Front-End'>Front-End</option>
              <option value='Back-End'>Back-End</option>
              <option value='TypeScript'>TypeScript</option>
              <option value='Game'>Game</option>
              <option value='Book / Learn'>Book / Learn</option>
            </select>
            <button type='submit' className={styles.uploadBtn}>
              Upload
            </button>
          </div>
        </div>
        <QuillNoSSRWrapper
          modules={modules}
          formats={formats}
          style={{ width: '100%', height: '100vh' }}
          theme='snow'
          onChange={setValue}
        />
      </form>
    </section>
  );
};

export default write;
