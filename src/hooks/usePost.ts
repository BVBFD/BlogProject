import React from 'react';
import { publicRequest } from '@/api/config';
import { PostsType } from '@/models/postsModel';
import { setCatName } from '@/redux/catNameSlice';
import { setOpenPostFalse } from '@/redux/openPostSlice';
import { setPaginationTotalNum } from '@/redux/paginationTotalNumSlice';
import { setPostClientY } from '@/redux/postClientYSlice';
import { setPostsVar } from '@/redux/postsVarSlice';
import { setFalse } from '@/redux/searchTextBolSlice';
import { setSearchText } from '@/redux/searchTextStringSlice';
import { RootState } from '@/redux/sliceStore';
import { logoutReduce } from '@/redux/userSlice';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

export const usePost = (ps: PostsType) => {
  const { user } = useSelector((state: RootState) => state);
  const router = useRouter();
  const dispatch = useDispatch();

  const deletePost = React.useCallback(async () => {
    const userConfirmed = window.confirm('정말로 삭제하시겠습니까?');

    if (userConfirmed) {
      try {
        const res = await publicRequest.delete(`/posts/${router.query.id}`, {
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
        // @ts-ignore
        window.alert(err.response.data.message);
      }
    } else {
      window.alert('삭제가 취소되었습니다.');
    }
  }, [ps, router.query.id, router]);

  const handleBeforeUnloadOnload = () => {
    dispatch(setFalse());
    dispatch(setPaginationTotalNum(0));
    dispatch(setSearchText(''));
    dispatch(setCatName(''));
    dispatch(setPostClientY(0));
    dispatch(setPostsVar([]));
    dispatch(setOpenPostFalse());
  };

  // prettier-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleBeforePopState = ({ url, as, options }: { url: string; as: string; options: { shallow?: boolean } }) => {
      options.shallow = true;
      return true;
    };

  return { deletePost, handleBeforeUnloadOnload, handleBeforePopState };
};
