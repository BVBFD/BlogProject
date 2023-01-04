import Image from 'next/image';
import styles from '../../styles/PostPage.module.css';
import { Edit, Delete } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Write from '../write';

import 'highlight.js/styles/vs2015.css';

const PostPage = () => {
  const [post, setPost] = useState<any>();
  const [editBtnIndex, setEditBtnIndex] = useState<boolean>(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`https://api.lsevina126.asia/posts/${id}`);
      setPost(res.data);
    };
    getPost();

    document
      .querySelectorAll('.videoImgs')
      .forEach((img) => img.setAttribute('style', ''));

    document
      .querySelectorAll('img')
      .forEach((img) => img.setAttribute('crossOrigin', 'anonymous'));
  }, []);

  const inputText = () => {
    return { __html: `${post?.text}` };
  };

  return !editBtnIndex ? (
    <section className={styles.postPage}>
      <div className={styles.postBox}>
        <div className={styles.postImgTextBox}>
          <div className={styles.postTitleImgBox}>
            <Image
              src={post?.imgUrl}
              alt='default'
              width={1920}
              height={1080}
            />
          </div>
          <div className={styles.postTextBox}>
            <header className={styles.postHeader}>
              <p>
                Category: <span>{post?.catName}</span>
              </p>
              <span>{post?.title}</span>
              <div>
                <Edit
                  onClick={() => {
                    if (!editBtnIndex) {
                      setEditBtnIndex(true);
                    } else {
                      setEditBtnIndex(false);
                    }
                  }}
                />
                <Delete />
              </div>
            </header>
            <div className={styles.authorAndDate}>
              <p>
                Author: <span>{post?.author}</span>
              </p>
              <span>{new Date(post?.createdAt).toDateString()}</span>
            </div>
            <div className='ql-snow'>
              <div
                // @ts-ignore
                class='ql-editor'
                className={styles.postContentText}
                dangerouslySetInnerHTML={inputText()}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <Write post={post} />
  );
};

export default PostPage;
