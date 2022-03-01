import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/header/Header";
import styles from "./Post.module.css";
import SidebarAboutMe from "../../components/sidebarAboutMe/SidebarAboutMe.jsx";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import Write from "../write/Write";
import { Context } from "../../context/context";

const Post = (props) => {
  const [post, setPost] = useState({});
  const location = useLocation();
  const param = useParams();
  const [editBtnIndex, setEditBtnIndex] = useState(false);
  const { id } = useContext(Context);

  const inputText = () => {
    return { __html: `${post.text}` };
  };

  useEffect(async () => {
    console.log(location.pathname, param.id);
    // 기존 APIs request 문법!
    // const response = await fetch(`http://localhost:5000/posts/${param.id}`, {
    //   method: "GET",
    //   headers: { "Content-Type": "application/json" },
    // });
    // const data = await response.json();
    // setPost(data);

    // axios 라이브러리 사용!
    try {
      const res = await axios.get(`http://localhost:5000/posts/${param.id}`);
      setPost(res.data);
    } catch (err) {
      console.log(err);
    }
  }, [location, param]);

  const deletePost = async () => {
    // 기존 APIs request 문법!
    // try {
    //   await fetch(`http://localhost:5000/posts/${param.id}`, {
    //   method: "DELETE",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     author: id,
    //   }),
    // });
    // } catch (err) {
    //   console.log(err);
    // }

    // axios 라이브러리 사용!
    try {
      await axios.delete(`http://localhost:5000/posts/${param.id}`, {
        data: { author: id },
      });
      window.location.replace("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className={styles.postPage}>
      {!editBtnIndex ? (
        <>
          <Header />
          <div className={styles.postBox}>
            <div className={styles.postImgTextBox}>
              <div className={styles.postTitleImgBox}>
                <img src={post.imgUrl} alt="" />
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
                      class="fa-solid fa-pen-to-square"
                    ></i>
                    <i onClick={deletePost} class="fa-solid fa-trash"></i>
                  </div>
                </header>
                <div className={styles.authorAndDate}>
                  <p>
                    Author: <span>{post.author}</span>
                  </p>
                  <span>{new Date(post.createdAt).toDateString()}</span>
                </div>
                <div
                  className={styles.postContentText}
                  dangerouslySetInnerHTML={inputText()}
                >
                  {/* <p>{post.text}</p> */}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Write />
      )}
    </section>
  );
};

export default Post;
