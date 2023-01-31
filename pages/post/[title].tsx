import Image from 'next/image';
import styles from '../../styles/PostPage.module.css';
import { Edit, Delete } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import 'highlight.js/styles/vs2015.css';
import { publicRequest } from '../../config';
import Head from 'next/head';
import { CircularProgress } from '@mui/material';
import { GetServerSidePropsContext, GetStaticPathsContext } from 'next/types';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/user';
import dynamic from 'next/dynamic';

const PostPage = ({ ps }: any) => {
  const [post, setPost] = useState<any>();
  const [editBtnIndex, setEditBtnIndex] = useState<boolean>(false);
  const router = useRouter();
  const { id } = router.query;
  const user = useSelector((state: RootState) => state.user);
  const Write = dynamic(() => import('../write'));

  useEffect(() => {
    const getPostOnClient = async () => {
      const res = await publicRequest.get(`/posts/${id}`);
      setPost(res.data);
    };
    getPostOnClient();

    document
      .querySelectorAll('.videoImgs')
      .forEach((img) => img.setAttribute('style', ''));

    document
      .querySelectorAll('img')
      .forEach((img) => img.setAttribute('crossOrigin', 'anonymous'));
  }, [editBtnIndex, id]);

  const inputText = () => {
    return { __html: `${post.text}` };
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
          author: `${user.id}`,
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
        {/* SEO */}
        <title>{ps.title}</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link
          rel='icon'
          href='https://res.cloudinary.com/dewa3t2gi/image/upload/v1674981291/qyeb9rvghfair1pkgqud.png'
        />
        <meta name='description' content={ps.title} />
        <meta property='og:title' content={ps.title} />
        <meta
          property='og:url'
          content={`https://lsevina126.netlify.app/post/${ps.title}/${ps._id}`}
        />
        <meta property='og:type' content='website' />
        <meta property='og:site_name' content={ps.title} />
        <meta property='og:image' content={ps.imgUrl} />
        <meta property='og:description' content={ps.title} />
        <link
          rel='canonical'
          href={`https://lsevina126.netlify.app/post/${ps.title}/${ps._id}`}
        />
        {/* SEO */}
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/icon?family=Material+Icons'
        />
        <link
          rel='stylesheet'
          href='https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css'
        />
        <script
          src='https://unpkg.com/react@16/umd/react.development.js'
          // @ts-ignore
          crossorigin
        ></script>
        <script
          src='https://unpkg.com/react-dom@16/umd/react-dom.development.js'
          // @ts-ignore
          crossorigin
        ></script>
        <script src='https://unpkg.com/react-quill@1.3.3/dist/react-quill.js'></script>
        <script src='https://unpkg.com/babel-standalone@6/babel.min.js'></script>
        <script type='text/babel' src='/my-scripts.js'></script>
      </Head>
      {post ? (
        <div className={styles.postBox}>
          <div className={styles.postImgTextBox}>
            <div className={styles.postTitleImgBox}>
              <Image
                src={post?.imgUrl}
                alt=''
                width={1920}
                height={1080}
                crossOrigin='anonymous'
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
                  <Delete onClick={deletePost} />
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
      ) : (
        <div className={styles.circularBox}>
          <CircularProgress size={60} />
        </div>
      )}
    </section>
  ) : (
    <Write post={post} setEditBtnIndex={setEditBtnIndex} />
  );
};

export default PostPage;

// export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
//   const res = await publicRequest.get(`/posts/${ctx.query.id}`);

//   return {
//     props: {
//       ps: res.data,
//     },
//   };
// };

export const getStaticPaths = async () => {
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: 'blocking',
    };
  }

  const res = await publicRequest.get(`/posts`);
  const posts = res.data.reverse();

  const paths = posts.map((post: any) => ({
    params: { id: post._id },
  }));

  return { paths, fallback: false };
};
