/* eslint-disable max-lines-per-function */
/* eslint-disable max-lines */
import dynamic from 'next/dynamic';
import Image from 'next/image';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { PictureFilled } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { Spin } from 'antd';
import { useSelector } from 'react-redux';

import hljs from 'highlight.js';
import 'highlight.js/styles/vs2015.css';
import 'react-quill/dist/quill.core.css';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

import BasicButton from '@/common/BasicButton';
import { publicRequest } from '../../../config';
import styles from '../../styles/write/index.module.scss';

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill');
    return function ({ forwardedRef, ...props }) {
      return <RQ ref={forwardedRef} {...props} />;
    };
  },
  {
    ssr: false,
  }
);

const Write = ({ post }) => {
  const [value, setValue] = useState(post?.text);
  const [isFetching, setIsFetching] = useState(false);
  const editorRef = useRef();
  const [titleImg, setTitleImg] = useState(true);
  const [writePageImgURL, setWritePageImgURL] = useState(
    !post || post?.imgUrl === ''
      ? 'https://res.cloudinary.com/dewa3t2gi/image/upload/v1675150372/omlojqzvdujpd3hhtpap.png'
      : post?.imgUrl
  );
  const [firstSubmit, setFirstSubmit] = useState(true);
  const { id } = useRouter().query;

  const [postTitle, setPostTitle] = useState();
  const [catName, setCatName] = useState('HTML / Git');
  const user = useSelector((state) => state.user);
  const router = useRouter();

  const check = () => {
    if (editorRef.current) {
      return editorRef.current;
    }
    setTimeout(() => check(), 0);
    return null;
  };

  const imageHandler = () => {
    const editorRefInside = check();
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.addEventListener('change', async () => {
      const file = input.files[0];

      const formData = new FormData();
      const filename = `${Date.now()}${file.name}`;
      formData.append('name', filename);
      formData.append('file', file);

      try {
        setIsFetching(true);
        const result = await publicRequest.post('/pic/upload', formData);
        const updatedPicURL = result.data;

        const IMG_URL = updatedPicURL;
        const editor = editorRefInside.getEditor();
        const range = editor.getSelection();

        editor.insertEmbed(range.index, 'image', IMG_URL);

        document.querySelectorAll('img').forEach((img) => img.setAttribute('crossOrigin', 'anonymous'));

        editor.setSelection(range.index + 1);
        setIsFetching(false);
      } catch (error) {
        window.alert('Fail!!');
        setIsFetching(false);
      }
    });
  };

  const videoHandler = () => {
    const editorRefInside = check();
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'video/*');
    input.click();

    input.addEventListener('change', async () => {
      const file = input.files[0];

      const formData = new FormData();
      const filename = `${Date.now()}${file.name}`;
      formData.append('name', filename);
      formData.append('file', file);

      try {
        setIsFetching(true);
        const result = await publicRequest.post('/video/upload', formData);
        const updatedVidURL = result.data;

        const VID_URL = updatedVidURL;
        const editor = editorRefInside.getEditor();
        const imgUrl = VID_URL.slice(0, -3).concat('png');

        editor.root.innerHTML = `${editor.root.innerHTML}<p>
          <a href="${VID_URL}" style="text-decoration: none;cusor:pointer;display:flex;flex-direction:column;">
            <img class="videoImgs" style="width: 500px;" src="${imgUrl}" crossOrigin></img>
            <span>
              ✅Click to play above Video🎦
            </span>
          </a>
        </p>`;
        // `<video controls src="${VID_URL}" crossorigin />`;

        setIsFetching(false);
      } catch (error) {
        window.alert('Fail!!');
        setIsFetching(false);
      }
    });
  };

  hljs.configure({
    languages: ['javascript', 'html', 'css', 'react', 'sass', 'typescript'],
  });

  const modules = useMemo(() => {
    return {
      syntax: {
        highlight: (text) => hljs.highlightAuto(text).value,
      },
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike'], // toggled buttons
          ['blockquote', 'code-block'],
          ['link', 'image', 'video'],

          [{ header: 1 }, { header: 2 }], // custom button values
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
          [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
          [{ direction: 'rtl' }], // text direction

          [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
          [{ header: [1, 2, 3, 4, 5, 6, false] }],

          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          [{ font: [] }],
          [{ align: [] }],

          ['clean'], // remove formatting button
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
    'image',
    'video',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'color',
    'background',
    'script',
    'header',
    'blockquote',
    'code-block',
    'indent',
    'list',
    'direction',
    'align',
    'link',
    'formula',
  ];

  const selectImg = async (e) => {
    setTitleImg(e.target.files[0]);
    if (e.target.files[0]) {
      const data = new FormData();
      const filename = `${Date.now()}${e.target.files[0].name}`;
      data.append('name', filename);
      data.append('file', e.target.files[0]);
      try {
        setIsFetching(true);
        const result = await publicRequest.post('/pic/upload', data);
        const updatedPicURL = result.data;
        setWritePageImgURL(updatedPicURL);
        setIsFetching(false);
      } catch (err) {
        window.alert(err);
        setIsFetching(false);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (firstSubmit) {
      setFirstSubmit(false);

      if (user.id !== 'lse126' || !user.editable) {
        window.alert('This is private Blog. Onle The Admin can edit!!');
        return;
      }

      try {
        const res = await publicRequest.post(
          `/posts`,
          {
            imgUrl: writePageImgURL,
            title: postTitle,
            text: value,
            catName,
            author: user.id,
          },
          {
            headers: {
              Idempotency_Key: `${Date.now()}${Math.random()}`,
            },
          }
        );

        router.push(`/post/${res.data?.savedNewPost?._id}`);
      } catch (error) {
        window.alert(error);
      }
    }
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    if (firstSubmit) {
      setFirstSubmit(false);

      try {
        const res = await publicRequest.put(
          `/posts/${id}`,
          {
            imgUrl: writePageImgURL,
            title: postTitle,
            text: value,
            catName,
            author: user.id,
          },
          {
            headers: {
              Idempotency_Key: `${Date.now()}${Math.random()}`,
            },
          }
        );

        if (res.status === 201) {
          window.location.reload(`/post/${res?.data._id}`);
        } else if (res.status === 401) {
          window.alert(`${res.statusText} This is private Blog. Onle The Admin can edit!!`);
        }
      } catch (error) {
        window.alert(error);
      }
    }
  };

  useEffect(() => {
    setFirstSubmit(true);
    return () => {
      setFirstSubmit(true);
    };
  }, []);

  return (
    <section className={styles.write}>
      {!isFetching ? (
        <div className={styles.titleImgBox}>
          {titleImg ? (
            <Image
              alt=""
              crossOrigin="anonymous"
              height={1080}
              /* eslint-disable no-nested-ternary */
              src={id ? (!writePageImgURL ? `${post.imgUrl}` : `${writePageImgURL}`) : `${writePageImgURL}`}
              width={1920}
            />
          ) : (
            <Image
              alt=""
              crossOrigin="anonymous"
              height={1080}
              src="https://res.cloudinary.com/dewa3t2gi/image/upload/v1675150372/omlojqzvdujpd3hhtpap.png"
              width={1920}
            />
          )}
        </div>
      ) : (
        <div />
      )}
      <form className={styles.titleImgAddBox}>
        <div className={styles.titleInputBox}>
          <div className={styles.imgFileTitleInputBox}>
            <label className={styles.imgFileLabel} htmlFor="imgFileInput">
              <PictureFilled />
              <input id="imgFileInput" onChange={selectImg} style={{ display: 'none' }} type="file" />
            </label>
            <input
              className={styles.titleInput}
              defaultValue={!post ? '' : post.title}
              onChange={(e) => setPostTitle(e.target.value)}
              placeholder="Title"
              type="text"
            />
          </div>
          <div className={styles.catnameUploadBox}>
            <select
              className={styles.selectCategory}
              defaultValue={!post ? 'HTML / Git' : post.catName}
              name="Category"
              onChange={(e) => setCatName(e.target.value)}
            >
              <option value="HTML / Git">HTML / Git</option>
              <option value="CSS">CSS</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Front-End">Front-End</option>
              <option value="Back-End">Back-End</option>
              <option value="TypeScript">TypeScript</option>
              <option value="Game">Game</option>
              <option value="Book / Learn">Book / Learn</option>
            </select>
            <BasicButton
              BasicButtonType="medium"
              className={styles.uploadBtn}
              disabled={!firstSubmit}
              onClick={!id ? handleSubmit : handleEdit}
            >
              Upload
            </BasicButton>
          </div>
        </div>
        <ReactQuill
          defaultValue={!post ? '' : post.text}
          formats={formats}
          forwardedRef={editorRef}
          modules={modules}
          onChange={setValue}
          style={{ width: '100%', height: '90vh' }}
          theme="snow"
        />
        {!isFetching ? (
          ''
        ) : (
          <div className={styles.loader}>
            <Spin />
          </div>
        )}
      </form>
    </section>
  );
};

export default Write;
