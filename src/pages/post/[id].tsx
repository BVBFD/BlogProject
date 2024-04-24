import React, { useEffect } from 'react';
import { NextSeo } from 'next-seo';
import useSWR from 'swr';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { usePost } from '@/hooks/usePost';

import Image from 'next/image';
import DeleteFilled from '@ant-design/icons/DeleteFilled';
import EditFilled from '@ant-design/icons/EditFilled';
import { Spin } from 'antd';
import { PostsType } from '@/models/postsModel';
import { fetcher, getSwrUrl, publicRequest, runSwrMutate } from '../../api/config';
import { RootState } from '../../redux/sliceStore';

import styles from '../../styles/post/index.module.scss';
import 'highlight.js/styles/vs2015.css';

export const getStaticPaths = async () => {
  const res = await publicRequest.get(`/posts`);
  const posts = res.data;

  const paths = Array.isArray(posts)
    ? posts.map((post: PostsType) => ({
        params: {
          id: post._id,
        },
      }))
    : [];

  return { paths, fallback: true };
};

export const getStaticProps = async ({ params }: { params: { id: string } }) => {
  const res = await publicRequest.get(`/posts/${params.id}?meta=true`);
  const ps = res.data;

  return {
    props: {
      ps,
    },
    revalidate: 3600,
  };
};

const PostPage = ({ ps }: { ps: PostsType }) => {
  const Write = React.lazy(() => import('../write'));
  const router = useRouter();
  const swrUrl = getSwrUrl({ postId: router.query.id });
  const { data, isLoading, error: swrError } = useSWR(swrUrl, fetcher);
  const [editBtnIndex, setEditBtnIndex] = React.useState<boolean>(false);
  const openPostBol = useSelector((state: RootState) => state.openPostBol);
  const dispatch = useDispatch();

  const { deletePost, handleBeforeUnloadOnload, handleBeforePopState } = usePost(ps);
  const inputText = () => {
    return { __html: `${data.text}` };
  };
  const toggleEditBtnIndex = () => setEditBtnIndex((prevState) => !prevState);

  useEffect(() => {
    router.beforePopState(handleBeforePopState);

    runSwrMutate(swrUrl);

    if (openPostBol) {
      window.addEventListener('unload', handleBeforeUnloadOnload);
    }

    return () => {
      window.removeEventListener('unload', handleBeforeUnloadOnload);
      router.beforePopState(() => true);
    };
  }, [dispatch, editBtnIndex]);

  if (swrError) {
    router.push('/');
  }

  return (
    ps && (
      <>
        <NextSeo
          canonical={`https://lsevina126.netlify.app/ps?/${ps?.title}/${ps?._id}`}
          description={ps?.title}
          openGraph={{
            url: `https://lsevina126.netlify.app/ps?/${ps?.title}/${ps?._id}`,
            title: `${ps?.title}`,
            description: `${ps?.title}`,
            images: [
              {
                url: ps ? ps.imgUrl : 'something',
                alt: ps?.title,
                type: 'image/gif',
              },
            ],
            siteName: `${ps?.title}`,
          }}
          title={ps?.title}
        />
        {!editBtnIndex && (
          <section className={styles.postPage}>
            {!isLoading ? (
              <div className={styles.postBox}>
                <div className={styles.postImgTextBox}>
                  <div className={styles.postTitleImgBox} style={{ backgroundColor: '#e4e4e4' }}>
                    <Image
                      alt="postImg"
                      crossOrigin="anonymous"
                      fetchPriority="high"
                      fill
                      loading="eager"
                      objectFit="contain"
                      quality={1}
                      src={data.imgUrl ? `${data.imgUrl}` : 'something'}
                    />
                  </div>
                  <div className={styles.postTextBox}>
                    <header className={styles.postHeader}>
                      <p>
                        Category: <span>{data.catName}</span>
                      </p>
                      <span className={styles.title}>{data.title}</span>
                      <div>
                        <EditFilled onClick={toggleEditBtnIndex} />
                        <DeleteFilled onClick={deletePost} />
                      </div>
                    </header>
                    <div className={styles.authorAndDate}>
                      <p>
                        Author: <span>{data.author}</span>
                      </p>
                      <span>{new Date(data.createdAt).toDateString()}</span>
                    </div>
                    <div className="ql-snow">
                      <div className={`${styles.postContentText} ql-editor`} dangerouslySetInnerHTML={inputText()} />
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
        )}
        <React.Suspense
          fallback={
            <div className={styles.circularBox}>
              <Spin />
            </div>
          }
        >
          {editBtnIndex && <Write editBtnIndex={editBtnIndex} post={data} setEditBtnIndex={setEditBtnIndex} />}
        </React.Suspense>
      </>
    )
  );
};

export default PostPage;
