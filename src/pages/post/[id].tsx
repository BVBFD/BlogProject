export const getServerSideProps = async ({ params }: { params: { id: string } }) => {
  const res = await publicRequest.get(`/posts/${params.id}?meta=true`);
  const ps = res.data;

  return {
    props: {
      ps,
    },
  };
};

import { lazy, memo, Suspense, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import DeleteFilled from '@ant-design/icons/DeleteFilled';
import EditFilled from '@ant-design/icons/EditFilled';
import { Spin } from 'antd';
import useSWR from 'swr';
import { RootState } from '../../redux/user';
import { publicRequest } from '../../../config';

import styles from '../../styles/post/index.module.scss';
import 'highlight.js/styles/vs2015.css';

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

const PostPage = memo(({ ps }: { ps: PostType }) => {
  const fetcher = (url: string) => publicRequest.get(url).then((res) => res.data);
  const router = useRouter();
  const { data } = useSWR(`/posts/${router.query.id}`, fetcher);
  // 초기 렌더링에서 필요하지 않은 무거운 컴포넌트에 대해 동적 임포트를 사용.
  const Write = lazy(() => import('../write'));
  const [editBtnIndex, setEditBtnIndex] = useState<boolean>(false);
  const { id } = router.query;
  const user = useSelector((state: RootState) => state.user);
  const [onLoad, setOnLoad] = useState(false);

  const inputText = () => {
    return { __html: `${data.text}` };
  };

  const deletePost = useCallback(async () => {
    // 확인 다이얼로그 표시
    const userConfirmed = window.confirm('정말로 삭제하시겠습니까?');

    // 사용자가 확인을 선택한 경우에만 삭제 진행
    if (userConfirmed) {
      try {
        const res = await publicRequest.post(`/posts/${id}`, {
          user_id: user.id,
          editable: user.editable,
        });
        if (res.status === 204) {
          router.push('/');
        } else if (res.status === 401) {
          window.alert(`${res.statusText} This is a private Blog. Only the Admin can edit!!`);
        }
      } catch (err) {
        window.alert(err);
      }
    } else {
      window.alert('삭제가 취소되었습니다.');
    }
  }, [user.id, user.editable, id, router]);

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
          {data ? (
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
                    src={`${data.imgUrl}`}
                  />
                </div>
                {onLoad && (
                  <div className={styles.postTextBox}>
                    <header className={styles.postHeader}>
                      <p>
                        Category: <span>{data.catName}</span>
                      </p>
                      <span>{data.title}</span>
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
        // 초기 렌더링에서 필요하지 않은 무거운 컴포넌트에 대해 동적 임포트를 사용.
        <Suspense fallback={<Spin />}>
          {editBtnIndex && <Write post={data} setEditBtnIndex={setEditBtnIndex} />}
        </Suspense>
      )}
    </>
  );
});

export default PostPage;

// export const getStaticPaths = async () => {
//   const res = await publicRequest.get(`/posts`);
//   const posts = res.data;

//   const paths = posts.map((post: any) => ({
//     params: {
//       id: post._id,
//     },
//   }));

//   return { paths, fallback: true };
// };

// export const getStaticProps = async ({ params }: any) => {
//   const res = await publicRequest.get(`/posts/${params.id}`);
//   const ps = res.data;

//   return {
//     props: {
//       ps,
//     },
//   };
// };
