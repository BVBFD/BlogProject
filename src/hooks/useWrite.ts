import React, { useEffect, useState } from 'react';
import { publicRequest } from '@/api/config';
import { setPostsVar } from '@/redux/postsVarSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/sliceStore';
import { CategoriesType, PostsType } from '@/models/postsModel';
import { logoutReduce } from '@/redux/userSlice';
import { useRouter } from 'next/router';
import { setPaginationTotalNum } from '@/redux/paginationTotalNumSlice';

const useWrite = (post: PostsType, setEditBtnIndex: React.Dispatch<React.SetStateAction<boolean>>, id: string) => {
  const {
    user,
    currentPageNum,
    searchText: searchTextRedux,
    catName: catNameRedux,
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const router = useRouter();

  const [titleImg, setTitleImg] = useState<File>();
  const [isFetching, setIsFetching] = useState(false);
  const [writePageImgURL, setWritePageImgURL] = useState<string>();
  const [firstSubmit, setFirstSubmit] = useState(true);

  const [catName, setCatName] = useState<string | CategoriesType>('HTML / Git');
  const [chagneValue, setChagneValue] = useState<string>();
  const [postTitle, setPostTitle] = useState<string>();
  const [uploadPostTitle, setUploadPostTitle] = useState<string>();

  useEffect(() => {
    if (!post) {
      setWritePageImgURL('https://res.cloudinary.com/dewa3t2gi/image/upload/v1675150372/omlojqzvdujpd3hhtpap.png');
      return;
    }

    const { imgUrl, catName: catNameNew, title } = post;

    if (post) {
      setWritePageImgURL(imgUrl);
      setCatName(catNameNew);
      setPostTitle(title);
    }

    setFirstSubmit(true);

    return () => {
      setFirstSubmit(true);
      setCatName('HTML / Git');
    };
  }, [post]);

  const selectImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const file = files && files[0];
    if (file) {
      setTitleImg(file);
      const data = new FormData();
      const filename = `${Date.now()}${file.name}`;
      data.append('name', filename);
      data.append('file', file);
      try {
        setIsFetching(true);
        const result = await publicRequest.post('/pic/upload', data);
        const updatedPicURL = result.data;
        setWritePageImgURL(updatedPicURL);
        setIsFetching(false);
      } catch (error) {
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        window.alert(error.response.data.message);
        setIsFetching(false);
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (firstSubmit) {
      setFirstSubmit(false);

      try {
        const res = await publicRequest.post(
          `/posts`,
          {
            imgUrl: writePageImgURL,
            title: uploadPostTitle,
            text: chagneValue,
            catName,
            author: user.id,
          },
          {
            headers: {
              Idempotency_Key: `${Date.now()}${Math.random()}`,
            },
          }
        );

        if (res.status === 244 && res.data.message === 'Access forbidden, invalid refreshToken') {
          window.alert('로그인 ID 유효기간이 만료되었습니다. 다시 로그인 해주세요!!');
          dispatch(logoutReduce());
          setFirstSubmit(true);
        } else {
          dispatch(setPostsVar([]));
          router.push(`/post/${res.data?.savedNewPost?._id}`);
        }
      } catch (error) {
        setFirstSubmit(true);
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        window.alert(error.response.data.message);
      }
    }
  };

  const handleEdit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (firstSubmit) {
      setFirstSubmit(false);

      try {
        const res = await publicRequest.put(`/posts/${id}`, {
          imgUrl: writePageImgURL,
          title: postTitle,
          text: chagneValue,
          catName,
          author: user.id,
        });

        if (res.status === 201) {
          const responseAfterEdit = await publicRequest.get(
            `/posts?page=${currentPageNum}&cat=${catNameRedux}&text=${searchTextRedux}`
          );
          const { posts, totalPostsCount } = await responseAfterEdit.data;
          dispatch(setPostsVar(posts));
          dispatch(setPaginationTotalNum(totalPostsCount));
          setEditBtnIndex(false);
        }

        if (res.status === 401) {
          window.alert(`${res.statusText} This is private Blog. Onle The Admin can edit!!`);
          setFirstSubmit(true);
        }

        if (res.status === 244 && res.data.message === 'Access forbidden, invalid refreshToken') {
          window.alert('로그인 ID 유효기간이 만료되었습니다. 다시 로그인 해주세요!!');
          dispatch(logoutReduce());
          setFirstSubmit(true);
        }
      } catch (error) {
        setFirstSubmit(true);
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        window.alert(error.response.data.message);
      }
    }
  };

  const handleSubmitAndEdit = () => {
    if (!id) {
      return handleSubmit;
    }
    return handleEdit;
  };

  return {
    selectImg,
    handleSubmitAndEdit,
    titleImg,
    isFetching,
    firstSubmit,
    writePageImgURL,
    setIsFetching,
    setCatName,
    setUploadPostTitle,
    setChagneValue,
  };
};

export default useWrite;
