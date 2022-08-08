import React, { useMemo, useContext, useEffect, useRef, useState } from 'react';
import Header from '../../components/header/Header.jsx';
import styles from './Write.module.css';
// import '@toast-ui/editor/dist/toastui-editor.css';
// import { Editor } from '@toast-ui/react-editor';
// import 'tui-color-picker/dist/tui-color-picker.css';
// import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
// import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { Context } from '../../context/context.js';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../config.js';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import hljs from 'highlight.js';
import 'react-quill/dist/quill.core.css';
import 'react-quill/dist/quill.bubble.css';
import 'highlight.js/styles/vs2015.css';

const Write = ({ setEditBtnIndex }) => {
  const [title, setTitle] = useState('');
  const [titleImg, setTitleImg] = useState();
  const [writePageImgURL, setWritePageImgURL] = useState('');
  const [catName, setCatName] = useState('HTML');
  const { id, editable } = useContext(Context);
  const [editorText, setEditorText] = useState('');
  const editorRef = useRef();
  const param = useParams();
  const [postForEdit, setPostForEdit] = useState({});
  const navigate = useNavigate();
  const [csrfToken, setCsrfToken] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [firstSubmit, setFirstSubmit] = useState(true);

  useEffect(async () => {
    const res = await fetch(
      `https://myportfolioblogproject.herokuapp.com/getCSRFToken`,
      {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Origin: `http://localhost:3000`,
        },
      }
    );

    const data = await res.json();
    setCsrfToken(data);
  }, []);

  useEffect(async () => {
    if (param.id) {
      const response = await axiosInstance.get(`/posts/${param.id}`);
      setTitleImg(true);
      setPostForEdit(response.data);
      setTitle(response.data.title);
      setWritePageImgURL(response.data.imgUrl);
      setCatName(response.data.catName);
      setEditorText(response.data.text);

      // 에디터 내의 이미지 태그에 crossOrigin 속성 부여!
      document
        .querySelectorAll('.ql-editor img')
        .forEach((img) => img.setAttribute('crossorigin', 'anonymous'));

      document
        .querySelectorAll('.ql-editor a img')
        .forEach((img) => img.setAttribute('style', 'max-width: 500px;'));
    }
    return () => setTitleImg();
  }, [param.id]);

  // useEffect(() => {
  //   if (editorRef.current) {
  //     // 기존에 Image 를 Import 하는 Hook을 제거한다.
  //     editorRef.current.getInstance().removeHook('addImageBlobHook');

  //     // 새롭게 Image 를 Import 하는 Hook을 생성한다.
  //     editorRef.current
  //       .getInstance()
  //       .addHook('addImageBlobHook', (blob, callback) => {
  //         (async () => {
  //           let formData = new FormData();
  //           let fileName = `${Date.now()}${blob.name}`;
  //           formData.append('name', fileName);
  //           formData.append('file', blob);

  //           console.log('이미지가 업로드 됐습니다.');

  //           try {
  //             // 기존 APIs request 문법!
  //             const response = await fetch(
  //               `https://myportfolioblogproject.herokuapp.com/pic/upload`,
  //               {
  //                 method: 'POST',
  //                 mode: 'cors',
  //                 // headers: {
  //                 //   Authorization: `Bearer ${token}`,
  //                 // },
  //                 credentials: 'include',
  //                 headers: {
  //                   Origin: `https://res.cloudinary.com`,
  //                 },
  //                 body: formData,
  //               }
  //             );
  //             const updatedPicURL = await response.json();
  //             const imageUrl = updatedPicURL;

  //             // axios 라이브러리 사용!
  //             // const res = await axiosInstance.post(`/pic/upload`, formData);
  //             // const imageUrl = res.data;
  //             callback(imageUrl, 'image');
  //           } catch (err) {
  //             console.log(err);
  //           }
  //         })();

  //         return false;
  //       });
  //   }

  //   return () => {};
  // }, [editorRef]);

  // 향후 비디오 파일 서버에 저장후 url만 가지고 올수 있도록 custom 예정
  // const videoHandler = () => {
  //   console.log('video handler on!!');
  //   // const getVideoUrl = (url) => {
  //   //   return url;
  //   // };

  //   const getVideoUrl = (url) => {
  //     let match =
  //       url.match(
  //         /^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/
  //       ) ||
  //       url.match(
  //         /^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/
  //       ) ||
  //       url.match(/^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/);
  //     console.log(match[2]);
  //     if (match && match[2].length === 11) {
  //       return 'https' + '://www.youtube.com/embed/' + match[2] + '?showinfo=0';
  //     }
  //     if (
  //       (match = url.match(/^(?:(https?):\/\/)?(?:www\.)?vimeo\.com\/(\d+)/))
  //     ) {
  //       // eslint-disable-line no-cond-assign
  //       return (
  //         (match[1] || 'https') + '://player.vimeo.com/video/' + match[2] + '/'
  //       );
  //     }
  //     return null;
  //   };

  //   const editor = editorRef.current.getEditor();
  //   let url = prompt('Enter Video URL: ');
  //   url = getVideoUrl(url);
  //   if (url != null) {
  //     console.log(url);
  //     editor.root.innerHTML =
  //       editor.root.innerHTML +
  //       editor.root.innerHTML +
  //       `<p><iframe width="560" height="315" src=${url} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen/></p>`;
  //   }
  // };

  const videoHandler = () => {
    console.log('video handler on!!');

    console.log('에디터에서 비디오 버튼을 클릭하면 이 핸들러가 시작됩니다!');

    // 1. 비디오를 저장할 input type=file DOM을 만든다.
    const input = document.createElement('input');

    // 속성 써주기
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'video/*');
    input.click(); // 에디터 비디오버튼을 클릭하면 이 input이 클릭된다.
    // input이 클릭되면 파일 선택창이 나타난다.
    console.log(input);

    input.addEventListener('change', async () => {
      console.log('File OnChange!');
      const file = input.files[0];
      console.log(file);

      // multer에 맞는 형식으로 데이터 만들어준다.
      const formData = new FormData();
      const filename = `${Date.now()}${file.name}`;
      formData.append('name', filename);
      formData.append('file', file); // formData는 키-밸류 구조
      // 백엔드 multer라우터에 비디오를 보낸다.
      try {
        setIsFetching(true);
        // axios 사용 Rate Litmit 기능 때문!
        const result = await axiosInstance.post('/video/upload', formData);
        const updatedVidURL = result.data;

        //  일반 fetch api
        // const response = await fetch(
        //   `https://myportfolioblogproject.herokuapp.com/video/upload`,
        //   {
        //     method: 'POST',
        //     mode: 'cors',
        //     credentials: 'include',
        //     // headers: {
        //     //   Authorization: `Bearer ${token}`,
        //     // },
        //     headers: {
        //       Origin: `https://res.cloudinary.com`,
        //       'Content-Securitiy-Policy':
        //         'img-src *;media-src https://res.cloudinary.com;child-src https://res.cloudinary.com;frame-src https://res.cloudinary.com;',
        //     },
        //     body: formData,
        //   }
        // );
        // const updatedVidURL = await response.json();
        console.log('성공 시, 백엔드가 보내주는 데이터', updatedVidURL);
        const vid_URL = updatedVidURL;
        // 이 URL을 비디오 태그의 src에 넣은 요소를 현재 에디터의 커서에 넣어주면 에디터 내에서 이미지가 나타난다
        // src가 base64가 아닌 짧은 URL이기 때문에 데이터베이스에 에디터의 전체 글 내용을 저장할 수있게된다
        // 비디오는 꼭 로컬 백엔드 uploads 폴더가 아닌 다른 곳에 저장해 URL로 사용하면된다.

        // 비디오 태그를 에디터에 써주기 - 여러 방법이 있다.
        const editor = editorRef.current.getEditor(); // 에디터 객체 가져오기
        const imgUrl = vid_URL.slice(0, -3).concat('png');
        // 가져온 위치에 비디오를 삽입한다.
        editor.root.innerHTML =
          editor.root.innerHTML +
          `<p>
          <a href="${vid_URL}" style="text-decoration: none;cusor:pointer;display:flex;flex-direction:column;">
            <img class="videoImgs" style="width: 500px;" src="${imgUrl}" crossOrigin></img>
            <span>
              ✅Click to play above Video🎦
            </span>
          </a>
        </p>`;

        document
          .querySelectorAll('.videoImg')
          .forEach((video) => video.setAttribute('width', '500px'));

        document
          .querySelectorAll('.videoImg')
          .forEach((video) => video.setAttribute('crossOrigin', 'anonymous'));
        setIsFetching(false);
      } catch (error) {
        console.log('실패!!!');
      }
    });
  };

  // 이미지 서버에 저장후 url만 가지고 올수 있도록 custom!
  const imageHandler = (e) => {
    console.log('에디터에서 이미지 버튼을 클릭하면 이 핸들러가 시작됩니다!');

    // 1. 이미지를 저장할 input type=file DOM을 만든다.
    const input = document.createElement('input');

    // 속성 써주기
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click(); // 에디터 이미지버튼을 클릭하면 이 input이 클릭된다.
    // input이 클릭되면 파일 선택창이 나타난다.
    console.log(input);

    input.addEventListener('change', async () => {
      console.log('File OnChange!');
      const file = input.files[0];
      console.log(file);

      // multer에 맞는 형식으로 데이터 만들어준다.
      const formData = new FormData();
      const filename = `${Date.now()}${file.name}`;
      formData.append('name', filename);
      formData.append('file', file); // formData는 키-밸류 구조
      // 백엔드 multer라우터에 이미지를 보낸다.
      try {
        setIsFetching(true);
        const result = await axiosInstance.post('/pic/upload', formData);
        const updatedPicURL = result.data;

        //  일반 fetch api
        // const response = await fetch(
        //   `https://myportfolioblogproject.herokuapp.com/pic/upload`,
        //   {
        //     method: 'POST',
        //     mode: 'cors',
        //     // headers: {
        //     //   Authorization: `Bearer ${token}`,
        //     // },
        //     body: formData,
        //   }
        // );
        // const updatedPicURL = await response.json();
        console.log('성공 시, 백엔드가 보내주는 데이터', updatedPicURL);
        const IMG_URL = updatedPicURL;
        // 이 URL을 img 태그의 src에 넣은 요소를 현재 에디터의 커서에 넣어주면 에디터 내에서 이미지가 나타난다
        // src가 base64가 아닌 짧은 URL이기 때문에 데이터베이스에 에디터의 전체 글 내용을 저장할 수있게된다
        // 이미지는 꼭 로컬 백엔드 uploads 폴더가 아닌 다른 곳에 저장해 URL로 사용하면된다.

        // 이미지 태그를 에디터에 써주기 - 여러 방법이 있다.
        const editor = editorRef.current.getEditor(); // 에디터 객체 가져오기
        // 1. 에디터 root의 innerHTML을 수정해주기
        // editor의 root는 에디터 컨텐츠들이 담겨있다. 거기에 img태그를 추가해준다.
        // 이미지를 업로드하면 -> 멀터에서 이미지 경로 URL을 받아와 -> 이미지 요소로 만들어 에디터 안에 넣어준다.
        // editor.root.innerHTML =
        //   editor.root.innerHTML + `<img src=${IMG_URL} /><br/>`; // 현재 있는 내용들 뒤에 써줘야한다.

        // 2. 현재 에디터 커서 위치값을 가져온다
        const range = editor.getSelection();
        // 가져온 위치에 이미지를 삽입한다
        editor.insertEmbed(range.index, 'image', IMG_URL);
        // 향후 교차출처 에러시 사용 메소드
        document
          .querySelectorAll('img')
          .forEach((img) => img.setAttribute('crossOrigin', 'anonymous'));
        // 자바스크립트 자동 엔터키 생각해보기!! 갔다와서
        editor.setSelection(range.index + 1);
        setIsFetching(false);
      } catch (error) {
        console.log('실패!!!');
      }
    });
  };

  hljs.configure({
    languages: ['javascript', 'html', 'css', 'react', 'sass', 'typescript'],
  });

  // Quill editor full toolbar 완성
  const modules = useMemo(() => {
    return {
      syntax: {
        highlight: (text) => hljs.highlightAuto(text).value,
      },
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          ['image', 'video', 'link', 'code-block', 'blockquote'],
          [
            {
              size: ['small', false, 'large', 'huge'],
            },
          ],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ script: 'sub' }, { script: 'super' }],
          [{ indent: '-1' }, { indent: '+1' }],
          [{ direction: 'rtl' }],
          [{ color: [] }, { background: [] }],
          [
            {
              font: [],
            },
          ],
          [{ align: [] }],
          ['clean'],
        ],
        handlers: {
          // 이미지 처리는 우리가 직접 imageHandler라는 함수로 처리할 것이다.
          image: imageHandler,
          video: videoHandler,
        },
      },
    };
  }, []);

  // Quill editor full formats 완성
  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'align',
    'strike',
    'script',
    'blockquote',
    'background',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'color',
    'code-block',
  ];

  const selectImg = async (e) => {
    // 기존 APIs request 문법!
    setTitleImg(e.target.files[0]);
    if (e.target.files[0]) {
      const data = new FormData();
      const filename = `${Date.now()}${e.target.files[0].name}`;
      data.append('name', filename);
      data.append('file', e.target.files[0]);
      try {
        setIsFetching(true);
        // axios 사용 Rate Litmit 기능 때문!
        const result = await axiosInstance.post('/pic/upload', data);
        const updatedPicURL = result.data;

        // 일반 fetch api 사용
        // const response = await fetch(
        //   `https://myportfolioblogproject.herokuapp.com/pic/upload`,
        //   {
        //     method: 'POST',
        //     mode: 'cors',
        //     // headers: {
        //     //   Authorization: `Bearer ${token}`,
        //     // },
        //     body: data,
        //   }
        // );
        // const updatedPicURL = await response.json();
        setWritePageImgURL(updatedPicURL);
        setIsFetching(false);
      } catch (err) {
        window.alert(err);
      }
    }

    // axios 라이브러리 사용!
    // setTitleImg(e.target.files[0]);
    // if (e.target.files[0]) {
    //   const data = new FormData();
    //   const filename = `${Date.now()}${e.target.files[0].name}`;
    //   data.append("name", filename);
    //   data.append("file", e.target.files[0]);
    //   try {
    //     const res = await axios.post(
    //       `${process.env.REACT_APP_BASE_URL}/pic/upload`,
    //       data
    //     );
    //     setWritePageImgURL(res.data);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (firstSubmit) {
      setFirstSubmit(false);

      if (id !== 'lse126' || !editable) {
        window.alert('개인블로그 입니다. 편집은 주인장만 가능!');
        return;
      }
      // 기존 APIs request 문법!
      // try {
      //   const response = await fetch(
      //     `https://myportfolioblogproject.herokuapp.com/posts`,
      //     {
      //       method: 'POST',
      //       credentials: 'include',
      //       headers: {
      //         'Content-Type': 'application/json',
      //         // Authorization: `Bearer ${token}`,
      //       },
      //       body: JSON.stringify({
      //         imgUrl: writePageImgURL,
      //         title: title,
      //         text: editorText,
      //         catName: catName,
      //         author: id,
      //       }),
      //     }
      //   );
      //   const data = await response.json();
      //   window.location.replace(`/post/${data.savedNewPost._id}`);
      // } catch (err) {
      //   window.alert('개인블로그 입니다. 편집은 주인장만 가능!');
      // }

      // axios 라이브러리 사용!
      try {
        const res = await axiosInstance.post(
          `/posts`,
          {
            imgUrl: writePageImgURL,
            title: title,
            text: editorText,
            catName: catName,
            author: id,
          },
          {
            headers: {
              CSRF_TOKEN: csrfToken,
              Idempotency_Key: `${Date.now()}${Math.random()}`,
            },
          }
        );

        navigate(`/post/${res.data.savedNewPost?._id}`);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    if (firstSubmit) {
      setFirstSubmit(false);

      // 기존 APIs request 문법!
      try {
        // const res = await fetch(
        //   `https://myportfolioblogproject.herokuapp.com/posts/${param.id}`,
        //   {
        //     method: 'PUT',
        //     headers: {
        //       'Content-Type': 'application/json',
        //       // Authorization: `Bearer ${token}`,
        //     },
        //     body: JSON.stringify({
        //       imgUrl: writePageImgURL,
        //       title: title,
        //       text: editorText,
        //       catName: catName,
        //       author: id,
        //     }),
        //   }
        // );

        // const data = await res.json();

        // console.log(data);

        // axios 라이브러리 사용!
        const res = await axiosInstance.put(
          `/posts/${param.id}`,
          {
            imgUrl: writePageImgURL,
            title: title,
            text: editorText,
            catName: catName,
            author: id,
          },
          {
            headers: {
              CSRF_TOKEN: csrfToken,
              Idempotency_Key: `${Date.now()}${Math.random()}`,
            },
          }
        );

        res.status === 401 &&
          window.alert(`${res.statusText} 이 글 작성자만 편집할 수 있습니다!`);

        res.status === 201 &&
          setEditBtnIndex(false) &&
          navigate(`/post/${param.id}`);
      } catch (err) {
        window.alert(err);
      }

      // axios 라이브러리 사용!
      // try {
      //   await axios.put(`${process.env.REACT_APP_BASE_URL}/posts/${param.id}`, {
      //     imgUrl: writePageImgURL,
      //     title: title,
      //     text: editorText,
      //     catName: catName,
      //     author: id,
      //   });
      //   window.location.replace(`/post/${param.id}`);
      // } catch (err) {
      //   console.log(err);
      // }
    }
  };

  return (
    <section className={styles.write}>
      <Header />
      {titleImg ? (
        <div className={styles.titleImgBox}>
          <img
            src={param.id ? postForEdit.imgUrl : writePageImgURL}
            alt=''
            crossOrigin='anonymous'
          />
        </div>
      ) : (
        <img src='../images/postdefaultimg.png' style={{ width: '100%' }} />
      )}
      <form
        onSubmit={param.id === undefined ? handleSubmit : handleEdit}
        className={styles.titleImgAddBox}
      >
        <div className={styles.titleInputBox}>
          <label className={styles.imgFileLabel} htmlFor='imgFileInput'>
            <i class='fas fa-plus'></i>
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
            onChange={(e) => setTitle(e.target.value)}
            defaultValue={param.id ? postForEdit.title : ''}
          />
          <select
            onChange={(e) => setCatName(e.target.value)}
            name='Category'
            className={styles.selectCategory}
            defaultValue={param.id ? postForEdit.catName : 'HTML'}
          >
            <option value='HTML'>HTML</option>
            <option value='CSS'>CSS</option>
            <option value='JavaScript / Svelte'>JavaScript / Svelte</option>
            <option value='React'>React</option>
            <option value='Node JS'>Node JS</option>
            <option value='TypeScript'>TypeScript</option>
            <option value='Game'>Game</option>
            <option value='Book / Learn'>Book / Learn</option>
          </select>
          <button type='submit' className={styles.uploadBtn}>
            Upload
          </button>
        </div>
        {/* <Editor
          className={styles.editor}
          ref={editorRef}
          onChange={(e) =>
            setEditorText(editorRef.current?.getInstance().getHTML())
          }
          previewStyle='vertical'
          height='90vh'
          initialValue={postForEdit?.text}
          initialEditType='markdown'
          toolbarItems={[
            ['heading', 'bold', 'italic', 'strike'],
            ['hr', 'quote'],
            ['ul', 'ol', 'task', 'indent', 'outdent'],
            ['table', 'image', 'link'],
            ['code', 'codeblock'],
          ]}
          plugins={[colorSyntax]}
          customHTMLRenderer={{
            image(node, context) {
              const { destination } = node;
              const { getChildrenText, skipChildren } = context;
              skipChildren();
              return {
                type: 'openTag',
                tagName: 'img',
                selfClose: true,
                attributes: {
                  src: destination,
                  alt: getChildrenText(node),
                  crossOrigin: 'anonymous',
                },
              };
            },
          }}
        /> */}
        <ReactQuill
          style={{ width: '100%', height: '90vh' }}
          className={styles.editor}
          height='90vh'
          ref={editorRef}
          modules={modules}
          formats={formats}
          value={editorText}
          defaultValue={param.id ? postForEdit.text : ''}
          onChange={setEditorText}
          // onKeyDown={detectRemoveImg}
          theme={'snow'}
        />
        {/* {param.id && (
          <div
            style={{
              width: '100%',
              padding: '1.2rem',
              backgroundColor: '#999',
              color: '#fff',
            }}
          >
            {postForEdit.text}
          </div>
        )} */}

        {!isFetching ? (
          ''
        ) : (
          <div className={styles.loader}>
            <span>
              <p></p>
              <p></p>
              <p></p>
              <p></p>
            </span>
            <span>
              <p></p>
              <p></p>
              <p></p>
              <p></p>
            </span>
            <span>
              <p></p>
              <p></p>
              <p></p>
              <p></p>
            </span>
          </div>
        )}
      </form>
    </section>
  );
};

export default Write;
