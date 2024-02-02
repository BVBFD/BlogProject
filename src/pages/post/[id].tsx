import React, { useEffect } from 'react';
import { NextSeo } from 'next-seo';
import useSWR, { mutate } from 'swr';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import Image from 'next/image';
import DeleteFilled from '@ant-design/icons/DeleteFilled';
import EditFilled from '@ant-design/icons/EditFilled';
import { Spin } from 'antd';

import { setPostsVar } from '@/redux/postsVarSlice';
import { setCatName } from '@/redux/catNameSlice';
import { setOpenPostFalse } from '@/redux/openPostSlice';
import { setPaginationTotalNum } from '@/redux/paginationTotalNumSlice';
import { setPostClientY } from '@/redux/postClientYSlice';
import { setFalse } from '@/redux/searchTextBolSlice';
import { setSearchText } from '@/redux/searchTextStringSlice';

import { logoutReduce } from '@/redux/userSlice';
import { publicRequest } from '../../../config';
import { RootState } from '../../redux/sliceStore';

import styles from '../../styles/post/index.module.scss';
import 'highlight.js/styles/vs2015.css';

interface PostType {
  _id: string;
  __v: number;
  title: string;
  imgUrl: string;
  createdAt: string;
}

export const getStaticPaths = async () => {
  const res = await publicRequest.get(`/posts`);
  const posts = res.data;

  const paths = Array.isArray(posts)
    ? posts.map((post: PostType) => ({
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

const PostPage = ({ ps }: { ps: PostType }) => {
  const fetcher = (url: string) => publicRequest.get(url).then((res) => res.data);
  const router = useRouter();
  const swrUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/posts/${router.query.id}`;
  const { data, isLoading, error: swrError } = useSWR(swrUrl, fetcher);
  const Write = React.lazy(() => import('../write'));
  const [editBtnIndex, setEditBtnIndex] = React.useState<boolean>(false);
  const { id } = router.query;
  const { user, openPostBol } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const inputText = () => {
    return { __html: `${data.text}` };
  };

  const deletePost = React.useCallback(async () => {
    const userConfirmed = window.confirm('정말로 삭제하시겠습니까?');

    if (userConfirmed) {
      try {
        const res = await publicRequest.delete(`/posts/${id}`, {
          data: {
            author: user.id,
          },
        });
        if (res.status === 204) {
          dispatch(setPostsVar([]));
          router.push('/');
        }

        if (res.status === 401) {
          window.alert(`${res.statusText} This is a private Blog. Only the Admin can edit!!`);
        }

        if (res.status === 244 && res.data.message === 'Access forbidden, invalid refreshToken') {
          window.alert('로그인 ID 유효기간이 만료되었습니다. 다시 로그인 해주세요!!');
          dispatch(logoutReduce());
        }
      } catch (err) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.alert(err.response.data.message);
      }
    } else {
      window.alert('삭제가 취소되었습니다.');
    }
  }, [ps, id, router]);

  const toggleEditBtnIndex = () => setEditBtnIndex((prevState) => !prevState);

  useEffect(() => {
    // prettier-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleBeforePopState = ({ url, as, options }: { url: string; as: string; options: { shallow?: boolean } }) => {
      options.shallow = true;
      return true;
    };

    router.beforePopState(handleBeforePopState);

    const handleBeforeUnloadOnload = () => {
      dispatch(setFalse());
      dispatch(setPaginationTotalNum(0));
      dispatch(setSearchText(''));
      dispatch(setCatName(''));
      dispatch(setPostClientY(0));
      dispatch(setPostsVar([]));
      dispatch(setOpenPostFalse());
    };

    mutate(swrUrl);

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
              url: ps?.imgUrl,
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
                    src={`${data.imgUrl}`}
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
  );
};

export default PostPage;
