/* eslint-disable max-lines-per-function */
/* eslint-disable max-lines */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import PictureFilled from '@ant-design/icons/PictureFilled';
import { Spin } from 'antd';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { logoutReduce } from '@/redux/userSlice';

import hljs from 'highlight.js';
import 'highlight.js/styles/vs2015.css';
import 'react-quill/dist/quill.core.css';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

import BasicButton from '@/common/BasicButton';
import { setPostsVar } from '@/redux/postsVarSlice';
import { setPaginationTotalNum } from '@/redux/paginationTotalNumSlice';
import { publicRequest } from '@/api/config';
import { categories } from '@/constants/categories';
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

const Write = ({ post, editBtnIndex, setEditBtnIndex }) => {
  const { currentPageNum, searchText: searchTextRedux, catName: catNameRedux } = useSelector((state) => state);
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
  const dispatch = useDispatch();

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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        window.alert(error.response.data.message);
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
          ['link', 'image'],

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
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        window.alert(error.response.data.message);
        setIsFetching(false);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (firstSubmit) {
      setFirstSubmit(false);

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

        if (res.status === 244 && res.data.message === 'Access forbidden, invalid refreshToken') {
          window.alert('로그인 ID 유효기간이 만료되었습니다. 다시 로그인 해주세요!!');
          dispatch(logoutReduce());
          setFirstSubmit(true);
        } else {
          dispatch(setPostsVar([]));
          router.push(`/post/${res.data?.savedNewPost?._id}`);
        }
      } catch (error) {
        setFirstSubmit(true);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        window.alert(error.response.data.message);
      }
    }
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    if (firstSubmit) {
      setFirstSubmit(false);

      try {
        const res = await publicRequest.put(`/posts/${id}`, {
          imgUrl: writePageImgURL,
          title: postTitle,
          text: value,
          catName,
          author: user.id,
        });

        if (res.status === 201) {
          const responseAfterEdit = await publicRequest.get(
            `/posts?page=${currentPageNum}&cat=${catNameRedux}&text=${searchTextRedux}`
          );
          const { posts, totalPostsCount } = await responseAfterEdit.data;
          dispatch(setPostsVar(posts));
          dispatch(setPaginationTotalNum(totalPostsCount));
          setEditBtnIndex(false);
        }

        if (res.status === 401) {
          window.alert(`${res.statusText} This is private Blog. Onle The Admin can edit!!`);
          setFirstSubmit(true);
        }

        if (res.status === 244 && res.data.message === 'Access forbidden, invalid refreshToken') {
          window.alert('로그인 ID 유효기간이 만료되었습니다. 다시 로그인 해주세요!!');
          dispatch(logoutReduce());
          setFirstSubmit(true);
        }
      } catch (error) {
        setFirstSubmit(true);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        window.alert(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    if (post) {
      setCatName(post.catName);
    }
    setFirstSubmit(true);

    return () => {
      setFirstSubmit(true);
      setCatName('HTML / Git');
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
              fill
              objectFit="contain"
              quality={5}
              /* eslint-disable no-nested-ternary */
              src={id ? (!writePageImgURL ? `${post.imgUrl}` : `${writePageImgURL}`) : `${writePageImgURL}`}
            />
          ) : (
            <Image
              alt=""
              crossOrigin="anonymous"
              fill
              objectFit="contain"
              quality={1}
              src="https://res.cloudinary.com/dewa3t2gi/image/upload/v1675150372/omlojqzvdujpd3hhtpap.png"
            />
          )}
        </div>
      ) : (
        <div />
      )}
      <form className={styles.titleImgAddBox}>
        <div className={styles.titleInputBox}>
          <div className={styles.imgFileTitleInputBox}>
            {/* eslint-disable jsx-a11y/label-has-associated-control */}
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
              {categories.map((category) => (
                <option key={category} value={`${category}`}>
                  {category}
                </option>
              ))}
            </select>
            <BasicButton
              BasicButtonType="medium"
              className={styles.uploadBtn}
              disabled={!firstSubmit}
              onClick={!id ? handleSubmit : handleEdit}
            >
              Upload
            </BasicButton>
            {editBtnIndex && (
              <BasicButton BasicButtonType="medium" className={styles.toPostBtn} onClick={() => setEditBtnIndex(false)}>
                To Post
              </BasicButton>
            )}
          </div>
        </div>
        <ReactQuill
          defaultValue={!post?.text ? '' : post.text}
          formats={formats}
          forwardedRef={editorRef}
          modules={modules}
          onChange={setValue}
          style={{ width: '100%', height: '70vh', marginBottom: '5vh' }}
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
