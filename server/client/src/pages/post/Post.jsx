import React, { useContext, useEffect, useRef, useState } from 'react';
import Header from '../../components/header/Header';
import styles from './Post.module.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Write from '../write/Write';
import { Context } from '../../context/context';
import axiosInstance from '../../config';

import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.core.css';
import 'react-quill/dist/quill.bubble.css';
import 'highlight.js/styles/vs2015.css';

const Post = () => {
  const [post, setPost] = useState({});
  const location = useLocation();
  const param = useParams();
  const [editBtnIndex, setEditBtnIndex] = useState(false);
  const { id } = useContext(Context);
  const [csrfToken, setCsrfToken] = useState('');
  const postTextBoxRef = useRef();
  const navigate = useNavigate();

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

  const inputText = () => {
    return { __html: `${post.text}` };
  };

  useEffect(async () => {
    // 기존 APIs request 문법!
    // const response = await fetch(`http://localhost:5000/posts/${param.id}`, {
    //   method: "GET",
    //   headers: { "Content-Type": "application/json" },
    // });
    // const data = await response.json();
    // setPost(data);

    // axios 라이브러리 사용!
    try {
      const res = await axiosInstance.get(`/posts/${param.id}`);
      setPost(res.data);
    } catch (err) {
      window.alert(err);
    }

    document
      .querySelectorAll('.videoImgs')
      .forEach((img) => img.setAttribute('style', ''));
  }, [location, param, editBtnIndex]);

  const deletePost = async () => {
    // 기존 APIs request 문법!
    try {
      const res = await fetch(
        `https://myportfolioblogproject.herokuapp.com/posts/${param.id}`,
        {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${token}`,
            CSRF_TOKEN: csrfToken,
          },
          body: JSON.stringify({
            author: id,
          }),
        }
      );
      res.status === 401 &&
        window.alert(`${res.statusText} 이 글 작성자만 편집할 수 있습니다!`);
      res.status === 204 && navigate('/');
    } catch (err) {
      window.alert(err);
    }
  };

  useEffect(() => {
    document
      .querySelectorAll('img')
      .forEach((img) => img.setAttribute('crossOrigin', 'anonymous'));
  }, []);

  return (
    <section className={styles.postPage}>
      {!editBtnIndex ? (
        <>
          <Header />
          <div className={styles.postBox}>
            <div className={styles.postImgTextBox}>
              <div className={styles.postTitleImgBox}>
                {post.imgUrl === '' ? (
                  <img src='../images/postdefaultimg.png' />
                ) : (
                  <img crossOrigin='anonymous' src={post.imgUrl} alt='' />
                )}
              </div>
              <div className={styles.postTextBox}>
                <header className={styles.postHeader}>
                  <p>
                    Category: <span>{post.catName}</span>
                  </p>
                  <span>{post.title}</span>
                  <div>
                    <i
                      onClick={() => {
                        if (!editBtnIndex) {
                          setEditBtnIndex(true);
                        } else {
                          setEditBtnIndex(false);
                        }
                      }}
                      class='fa-solid fa-pen-to-square'
                    ></i>
                    <i onClick={deletePost} class='fa-solid fa-trash'></i>
                  </div>
                </header>
                <div className={styles.authorAndDate}>
                  <p>
                    Author: <span>{post.author}</span>
                  </p>
                  <span>{new Date(post.createdAt).toDateString()}</span>
                </div>
                <div className='ql-snow'>
                  <div
                    class='ql-editor'
                    ref={postTextBoxRef}
                    className={styles.postContentText}
                    dangerouslySetInnerHTML={inputText()}
                  >
                    {/* <p>{post.text}</p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Write setEditBtnIndex={setEditBtnIndex} />
      )}
    </section>
  );
};

export default Post;
