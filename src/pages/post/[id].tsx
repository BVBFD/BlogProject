import Image from 'next/image';
import { DeleteFilled, EditFilled } from '@ant-design/icons';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Spin } from 'antd';
// import { GetServerSidePropsContext } from 'next/types';
import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import { RootState } from '../../redux/user';
import { publicRequest } from '../../../config';
import styles from '../../styles/post/index.module.scss';
import 'highlight.js/styles/vs2015.css';

interface PostType {
  _id: string;
  __v: number;
  updatedAt: string;
  title: string;
  text: string;
  imgUrl: string;
  createdAt: string;
  catName: string;
  author: string;
}

const PostPage = ({ ps }: { ps: PostType }) => {
  const [post, setPost] = useState<PostType>();
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

    document.querySelectorAll('.videoImgs').forEach((img) => img.setAttribute('style', ''));

    document.querySelectorAll('img').forEach((img) => img.setAttribute('crossOrigin', 'anonymous'));
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
          author: `${user?.id}`,
        }),
      });

      if (res.status === 204) {
        router.push('/');
      } else if (res.status === 401) {
        window.alert(`${res.statusText} This is private Blog. Onle The Admin can edit!!`);
      }
    } catch (err) {
      window.alert(err);
    }
  };

  return (
    <>
      <Head>
        {/* SEO */}
        <title>{ps?.title}</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta content={ps?.title} name="description" />
        <meta content={ps?.title} property="og:title" />
        <meta content={`https://lsevina126.netlify.app/post/${ps?.title}/${ps?._id}`} property="og:url" />
        <meta content="website" property="og:type" />
        <meta content={ps?.title} property="og:site_name" />
        <meta content={ps?.imgUrl} property="og:image" />
        <meta content={ps?.title} property="og:description" />
        <link href={`https://lsevina126.netlify.app/post/${ps?.title}/${ps?._id}`} rel="canonical" />
        {/* SEO */}
      </Head>
      {!editBtnIndex ? (
        <section className={styles.postPage}>
          {post ? (
            <div className={styles.postBox}>
              <div className={styles.postImgTextBox}>
                <div className={styles.postTitleImgBox}>
                  <Image alt="" crossOrigin="anonymous" height={1080} src={`${post.imgUrl}`} width={1920} />
                </div>
                <div className={styles.postTextBox}>
                  <header className={styles.postHeader}>
                    <p>
                      Category: <span>{post.catName}</span>
                    </p>
                    <span>{post.title}</span>
                    <div>
                      <EditFilled
                        onClick={() => {
                          if (!editBtnIndex) {
                            setEditBtnIndex(true);
                          } else {
                            setEditBtnIndex(false);
                          }
                        }}
                      />
                      <DeleteFilled onClick={deletePost} />
                    </div>
                  </header>
                  <div className={styles.authorAndDate}>
                    <p>
                      Author: <span>{post.author}</span>
                    </p>
                    <span>{new Date(post.createdAt).toDateString()}</span>
                  </div>
                  <div className="ql-snow">
                    <div
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      class="ql-editor"
                      className={styles.postContentText}
                      dangerouslySetInnerHTML={inputText()}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.circularBox}>
              <Spin />
            </div>
          )}
        </section>
      ) : (
        <Write post={post} />
      )}
    </>
  );
};

export default PostPage;

export const getServerSideProps = async ({ params }: { params: { id: string } }) => {
  // const res = await fetch(
  //   `https://api.lsevina126.asia/posts/${params.id}?meta=true`
  // );
  // const ps = await res.json();
  const { PostSeo } = await import('../../postSeo');
  const post = PostSeo.filter((p: PostType) => p._id === params.id);

  let ps;
  if (post[0] == null) {
    const res = await fetch(`https://api.lsevina126.asia/posts/${params.id}?meta=true`);
    ps = await res.json();
  } else {
    const { text, ...others } = post[0] as PostType;
    ps = others;
  }

  return {
    props: {
      ps,
    },
  };
};

// export const getStaticPaths = async () => {
//   const res = await fetch(`https://api.lsevina126.asia/posts`);
//   const posts = await res.json();

//   const paths = posts.map((post: any) => ({
//     params: {
//       id: post._id,
//     },
//   }));

//   return { paths, fallback: true };
// };

// export const getStaticProps = async ({ params }: any) => {
//   const id = params.id;
//   const res = await fetch(`https://api.lsevina126.asia/posts/${id}`);
//   const ps = await res.json();

//   return {
//     props: {
//       ps,
//     },
//   };
// };
