import Image from 'next/image';
import styles from '../../styles/PostPage.module.css';
import { Edit, Delete } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Write from '../write';

import 'highlight.js/styles/vs2015.css';
import { publicRequest } from '../config';
import Head from 'next/head';
import { CircularProgress } from '@mui/material';
import { GetServerSidePropsContext } from 'next/types';
// import { GetServerSidePropsContext } from 'next';

const PostPage = ({ ps }: any) => {
  const [post, setPost] = useState<any>();
  const [editBtnIndex, setEditBtnIndex] = useState<boolean>(false);
  const router = useRouter();
  const { id } = router.query;

  const [user, setUser] = useState('lse126');
  // const [getDataSSR, setGetDataSSR] = useState(false);

  useEffect(() => {
    // const getPostOnClient = async () => {
    //   const res = await publicRequest.get(`/posts/${id}`);
    //   setPost(res.data);
    // };
    // getPostOnClient();

    const getPost = () => {
      setPost(ps);
    };
    getPost();

    document
      .querySelectorAll('.videoImgs')
      .forEach((img) => img.setAttribute('style', ''));

    document
      .querySelectorAll('img')
      .forEach((img) => img.setAttribute('crossOrigin', 'anonymous'));
  }, [editBtnIndex, id]);

  const inputText = () => {
    return { __html: `${post?.text}` };
  };

  const deletePost = async () => {
    try {
      const res = await fetch(`https://api.lsevina126.asia/posts/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          author: user,
        }),
      });
      res.status === 401 &&
        window.alert(
          `${res.statusText} This is private Blog. Onle The Admin can edit!!`
        );
      res.status === 204 && router.push('/');
    } catch (err) {
      window.alert(err);
    }
  };

  return !editBtnIndex ? (
    <section className={styles.postPage}>
      <Head>
        <title>{post?.title}</title>
        <meta name='description' content={post?.title} />
        <meta property='og:title' content={post?.title} />
        <meta
          property='og:url'
          content={`https://www.lsevina126.asia/post/${post?.title}/${post?._id}`}
        />
        <meta property='og:type' content='website' />
        <meta property='og:site_name' content='Blog Project for lsevina126' />
        <meta property='og:image' content={post?.imgUrl} />
        <meta property='og:description' content={post?.title} />
        <link
          rel='canonical'
          href={`https://www.lsevina126.asia/post/${post?.title}/${post?._id}`}
        />
      </Head>
      <div className={styles.postBox}>
        <div className={styles.postImgTextBox}>
          <div className={styles.postTitleImgBox}>
            {post?.imgUrl === '' ? (
              <Image
                src={'/imgs/postdefaultimg.png'}
                alt='default'
                width={1920}
                height={1080}
              />
            ) : (
              post && (
                <Image
                  src={post?.imgUrl}
                  alt=''
                  width={1920}
                  height={1080}
                  crossOrigin='anonymous'
                />
              )
            )}
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
                <Delete onClick={deletePost} />
              </div>
            </header>
            {!post ? (
              <></>
            ) : (
              <div className={styles.authorAndDate}>
                <p>
                  Author: <span>{post?.author}</span>
                </p>
                <span>{new Date(post?.createdAt).toDateString()}</span>
              </div>
            )}
            <div className='ql-snow'>
              {!post ? (
                <div className={styles.circularBox}>
                  <CircularProgress size={60} />
                </div>
              ) : (
                <div
                  // @ts-ignore
                  class='ql-editor'
                  className={styles.postContentText}
                  dangerouslySetInnerHTML={inputText()}
                ></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <Write post={post} setEditBtnIndex={setEditBtnIndex} />
  );
};

export default PostPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const res = await publicRequest.get(`/posts/${ctx.query.id}`);

  return {
    props: {
      ps: res.data,
    },
  };
};
