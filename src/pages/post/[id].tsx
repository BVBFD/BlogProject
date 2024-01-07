import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import DeleteFilled from '@ant-design/icons/DeleteFilled';
import EditFilled from '@ant-design/icons/EditFilled';
import { Spin } from 'antd';
import { setPostsVar } from '@/redux/postsVarSlice';
import { publicRequest } from '../../../config';
import { RootState } from '../../redux/sliceStore';

import styles from '../../styles/post/index.module.scss';
import 'highlight.js/styles/vs2015.css';
import { logoutReduce } from '@/redux/userSlice';

export const getServerSideProps = async ({ params }: { params: { id: string } }) => {
  const res = await publicRequest.get(`/posts/${params.id}`);
  const ps = res.data;

  return {
    props: {
      ps,
    },
  };
};

interface PostType {
  _id: string;
  __v: number;
  updatedAt: string;
  title: string;
  text?: string;
  imgUrl: string;
  createdAt: string;
  catName: string;
  author: string;
}

const PostPage = ({ ps }: { ps: PostType }) => {
  const router = useRouter();
  const Write = React.lazy(() => import('../write'));
  const [editBtnIndex, setEditBtnIndex] = React.useState<boolean>(false);
  const { id } = router.query;
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [onLoad, setOnLoad] = React.useState(false);

  const inputText = () => {
    return { __html: `${ps.text}` };
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
        window.alert(err);
      }
    } else {
      window.alert('삭제가 취소되었습니다.');
    }
  }, [ps, id, router]);

  const toggleEditBtnIndex = () => setEditBtnIndex((prevState) => !prevState);

  return (
    <>
      <Head>
        {/* SEO */}
        <title>{ps?.title}</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta content={ps?.title} name="description" />
        <meta content={ps?.title} property="og:title" />
        <meta content={`https://lsevina126.netlify.app/ps/${ps?.title}/${ps?._id}`} property="og:url" />
        <meta content="website" property="og:type" />
        <meta content={ps?.title} property="og:site_name" />
        <meta content={ps?.imgUrl} property="og:image" />
        <meta content={ps?.title} property="og:description" />
        <link href={`https://lsevina126.netlify.app/ps/${ps?.title}/${ps?._id}`} rel="canonical" />
        {/* SEO */}
      </Head>
      {!editBtnIndex ? (
        <section className={styles.postPage}>
          {ps ? (
            <div className={styles.postBox}>
              <div className={styles.postImgTextBox}>
                <div
                  className={styles.postTitleImgBox}
                  style={onLoad ? { backgroundColor: '#e4e4e4' } : { backgroundColor: 'unset' }}
                >
                  <Image
                    alt=""
                    crossOrigin="anonymous"
                    fill
                    loading="lazy"
                    objectFit="contain"
                    onLoad={() => setOnLoad(true)}
                    quality={20}
                    src={`${ps.imgUrl}`}
                  />
                </div>
                {onLoad && (
                  <div className={styles.postTextBox}>
                    <header className={styles.postHeader}>
                      <p>
                        Category: <span>{ps.catName}</span>
                      </p>
                      <span>{ps.title}</span>
                      <div>
                        <EditFilled onClick={toggleEditBtnIndex} />
                        <DeleteFilled onClick={deletePost} />
                      </div>
                    </header>
                    <div className={styles.authorAndDate}>
                      <p>
                        Author: <span>{ps.author}</span>
                      </p>
                      <span>{new Date(ps.createdAt).toDateString()}</span>
                    </div>
                    <div className="ql-snow">
                      <div className={`${styles.postContentText} ql-editor`} dangerouslySetInnerHTML={inputText()} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className={styles.circularBox}>
              <Spin />
            </div>
          )}
        </section>
      ) : (
        <React.Suspense
          fallback={
            <div className={styles.circularBox}>
              <Spin />
            </div>
          }
        >
          {editBtnIndex && <Write post={ps} />}
        </React.Suspense>
      )}
    </>
  );
};

export default PostPage;
