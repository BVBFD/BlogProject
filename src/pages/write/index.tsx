import Image from 'next/image';
import PictureFilled from '@ant-design/icons/PictureFilled';
import { Spin } from 'antd';
import { useRouter } from 'next/router';

import BasicButton from '@/common/BasicButton';
import useWrite from '@/hooks/useWrite';
import { PostsType } from '@/models/postsModel';
import { categories } from '@/constants/categories';
import styles from '../../styles/write/index.module.scss';
import Editor from '../../components/Write/Editor/editor';

export interface WriteProps {
  post: PostsType;
  editBtnIndex: boolean;
  setEditBtnIndex: React.Dispatch<React.SetStateAction<boolean>>;
}

const Write = ({ post, editBtnIndex, setEditBtnIndex }: WriteProps) => {
  const { id } = useRouter().query;
  const {
    selectImg,
    handleSubmitAndEdit,
    titleImg,
    isFetching,
    firstSubmit,
    writePageImgURL,
    setCatName,
    setUploadPostTitle,
  } = useWrite(post, setEditBtnIndex, id as string);

  return (
    <section className={styles.write}>
      {!isFetching ? (
        <div className={styles.titleImgBox}>
          {titleImg || writePageImgURL ? (
            <Image alt="" crossOrigin="anonymous" fill objectFit="contain" quality={5} src={`${writePageImgURL}`} />
          ) : (
            <Image
              alt=""
              crossOrigin="anonymous"
              fill
              objectFit="contain"
              quality={1}
              src="https://res.cloudinary.com/dewa3t2gi/image/upload/v1675150372/omlojqzvdujpd3hhtpap.png"
            />
          )}
        </div>
      ) : (
        <div />
      )}
      <form className={styles.titleImgAddBox}>
        <div className={styles.titleInputBox}>
          <div className={styles.imgFileTitleInputBox}>
            {/* eslint-disable jsx-a11y/label-has-associated-control */}
            <label className={styles.imgFileLabel} htmlFor="imgFileInput">
              <PictureFilled />
              <input id="imgFileInput" onChange={selectImg} style={{ display: 'none' }} type="file" />
            </label>
            <input
              className={styles.titleInput}
              defaultValue={!post ? '' : post.title}
              onChange={(e) => setUploadPostTitle(e.target.value)}
              placeholder="Title"
              type="text"
            />
          </div>
          <div className={styles.catnameUploadBox}>
            <select
              className={styles.selectCategory}
              defaultValue={!post ? 'HTML / Git' : post.catName}
              name="Category"
              onChange={(e) => setCatName(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={`${category}`}>
                  {category}
                </option>
              ))}
            </select>
            <BasicButton
              BasicButtonType="medium"
              className={styles.uploadBtn}
              disabled={!firstSubmit}
              onClick={handleSubmitAndEdit}
            >
              Upload
            </BasicButton>
            {editBtnIndex && (
              <BasicButton BasicButtonType="medium" className={styles.toPostBtn} onClick={() => setEditBtnIndex(false)}>
                To Post
              </BasicButton>
            )}
          </div>
        </div>
        <Editor post={post} setEditBtnIndex={setEditBtnIndex} />
        {!isFetching ? (
          ''
        ) : (
          <div className={styles.loader}>
            <Spin />
          </div>
        )}
      </form>
    </section>
  );
};

export default Write;
