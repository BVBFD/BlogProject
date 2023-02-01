import dynamic from 'next/dynamic';
import Image from 'next/image';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import styles from '../styles/Write.module.css';
import { AddPhotoAlternate } from '@mui/icons-material';
import { publicRequest } from '../config';
import { useRouter } from 'next/router';
import { CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill');
    return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
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
    !post
      ? 'https://res.cloudinary.com/dewa3t2gi/image/upload/v1675150372/omlojqzvdujpd3hhtpap.png'
      : post.imgUrl
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
    setTimeout(check, 0);
  };

  const imageHandler = (e) => {
    console.log('imageHandler');
    let editorRefInside = check();
    console.log(editorRefInside);
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.addEventListener('change', async () => {
      console.log('File OnChange!');
      const file = input.files[0];
      console.log(file);

      const formData = new FormData();
      const filename = `${Date.now()}${file.name}`;
      formData.append('name', filename);
      formData.append('file', file);

      try {
        setIsFetching(true);
        const result = await publicRequest.post('/pic/upload', formData);
        const updatedPicURL = result.data;

        console.log('The URL data upon success', updatedPicURL);
        const IMG_URL = updatedPicURL;
        const editor = editorRefInside.getEditor();
        const range = editor.getSelection();

        editor.insertEmbed(range.index, 'image', IMG_URL);

        document
          .querySelectorAll('img')
          .forEach((img) => img.setAttribute('crossOrigin', 'anonymous'));

        editor.setSelection(range.index + 1);
        setIsFetching(false);
      } catch (error) {
        window.alert('Fail!!');
        setIsFetching(false);
      }
    });
  };

  const videoHandler = (e) => {
    console.log('videoHandler');
    let editorRefInside = check();
    console.log(editorRefInside);
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'video/*');
    input.click();

    input.addEventListener('change', async () => {
      console.log('File OnChange!');
      // @ts-ignore
      const file = input.files[0];
      console.log(file);

      const formData = new FormData();
      const filename = `${Date.now()}${file.name}`;
      formData.append('name', filename);
      formData.append('file', file);

      try {
        setIsFetching(true);
        const result = await publicRequest.post('/video/upload', formData);
        const updatedVidURL = result.data;

        console.log('The URL data upon success', updatedVidURL);
        const VID_URL = updatedVidURL;
        const editor = editorRefInside.getEditor();
        const imgUrl = VID_URL.slice(0, -3).concat('png');

        editor.root.innerHTML =
          editor.root.innerHTML +
          `<p>
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
            catName: catName,
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
            catName: catName,
            author: user.id,
          },
          {
            headers: {
              Idempotency_Key: `${Date.now()}${Math.random()}`,
            },
          }
        );

        res.status === 401 &&
          window.alert(
            `${res.statusText} This is private Blog. Onle The Admin can edit!!`
          );

        res.status === 201 && window.location.reload(`/post/${res?.data._id}`);
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

  if (router.isFallback) {
    return (
      <div>
        <CircularProgress size={60} />
      </div>
    );
  }

  return (
    <section className={styles.write}>
      {!isFetching ? (
        <div className={styles.titleImgBox}>
          {titleImg ? (
            <Image
              src={
                id
                  ? !writePageImgURL
                    ? `${post.imgUrl}`
                    : `${writePageImgURL}`
                  : `${writePageImgURL}`
              }
              alt=''
              width={1920}
              height={1080}
              crossOrigin='anonymous'
            />
          ) : (
            <Image
              src={
                'https://res.cloudinary.com/dewa3t2gi/image/upload/v1675150372/omlojqzvdujpd3hhtpap.png'
              }
              alt=''
              width={1920}
              height={1080}
              crossOrigin='anonymous'
            />
          )}
        </div>
      ) : (
        <div></div>
      )}
      <form
        onSubmit={!id ? handleSubmit : handleEdit}
        className={styles.titleImgAddBox}
      >
        <div className={styles.titleInputBox}>
          <div className={styles.imgFileTitleInputBox}>
            <label className={styles.imgFileLabel} htmlFor='imgFileInput'>
              <AddPhotoAlternate />
            </label>
            <input
              onChange={selectImg}
              id='imgFileInput'
              type='file'
              style={{ display: 'none' }}
            />
            <input
              className={styles.titleInput}
              type='text'
              autoFocus={true}
              placeholder='Title'
              onChange={(e) => setPostTitle(e.target.value)}
              defaultValue={!post ? '' : post.title}
            />
          </div>
          <div className={styles.catnameUploadBox}>
            <select
              onChange={(e) => setCatName(e.target.value)}
              name='Category'
              className={styles.selectCategory}
              defaultValue={!post ? 'HTML / Git' : post.catName}
            >
              <option value='HTML / Git'>HTML / Git</option>
              <option value='CSS'>CSS</option>
              <option value='JavaScript'>JavaScript</option>
              <option value='Front-End'>Front-End</option>
              <option value='Back-End'>Back-End</option>
              <option value='TypeScript'>TypeScript</option>
              <option value='Game'>Game</option>
              <option value='Book / Learn'>Book / Learn</option>
            </select>
            <button
              type='submit'
              disabled={!firstSubmit}
              className={styles.uploadBtn}
            >
              Upload
            </button>
          </div>
        </div>
        <ReactQuill
          forwardedRef={editorRef}
          modules={modules}
          formats={formats}
          style={{ width: '100%', height: '100vh' }}
          theme='snow'
          onChange={setValue}
          defaultValue={!post ? '' : post.text}
        />
        {!isFetching ? (
          ''
        ) : (
          <div className={styles.loader}>
            <CircularProgress />
          </div>
        )}
      </form>
    </section>
  );
};

export default Write;
