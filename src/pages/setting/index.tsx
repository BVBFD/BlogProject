import { Spin } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/sliceStore';
import { loginReduce, logoutReduce } from '@/redux/userSlice';
import BasicButton from '@/common/BasicButton';
import styles from '../../styles/setting/index.module.scss';
import { publicRequest } from '../../../config';

const Setting = () => {
  const { id, email, profilePic } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [newProfileImgURL, setNewProfileImgURL] = useState('');
  const [newId, setNewId] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const router = useRouter();

  const [isFetching, setIsFetching] = useState(false);

  const selectProfileImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if ((e.target.files as FileList)[0]) {
      const data = new FormData();
      const filename = `${Date.now()}${(e.target.files as FileList)[0].name}`;
      data.append('name', filename);
      data.append('file', (e.target.files as FileList)[0]);
      try {
        setIsFetching(true);
        const result = await publicRequest.post('/pic/upload', data);
        const updatedPicURL = result.data;
        setNewProfileImgURL(updatedPicURL);
        setIsFetching(false);
      } catch (err) {
        setIsFetching(false);
        window.alert(err);
      }
    }
  };

  const updateUserData = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (newPwd === '') {
        const response = await publicRequest.put(`/loginDatas/update`, {
          userId: id,
          updatedId: newId === '' ? id : newId,
          email: newEmail === '' ? email : newEmail,
          profilePic: newProfileImgURL === '' ? profilePic : newProfileImgURL,
        });
        dispatch(logoutReduce());
        dispatch(
          loginReduce({
            userId: response.data.sendUpdatedLoginData.userId,
            profilePic: response.data.sendUpdatedLoginData.profilePic,
            email: response.data.sendUpdatedLoginData.email,
          })
        );
      } else {
        const response = await publicRequest.put(`/loginDatas/update`, {
          userId: id,
          updatedId: newId === '' ? id : newId,
          password: newPwd,
          email: newEmail === '' ? email : newEmail,
          profilePic: newProfileImgURL === '' ? profilePic : newProfileImgURL,
        });
        dispatch(logoutReduce());
        dispatch(
          loginReduce({
            userId: response.data.sendUpdatedLoginData.userId,
            profilePic: response.data.sendUpdatedLoginData.profilePic,
            email: response.data.sendUpdatedLoginData.email,
          })
        );
      }

      router.push('/');
    } catch (err) {
      window.alert(err);
    }
  };

  const deleteUserData = async () => {
    try {
      await publicRequest.delete(`/loginDatas/delete?userId=${id}`);
      dispatch(logoutReduce());
      router.push('/');
    } catch (err) {
      window.alert(err);
    }
  };

  return (
    <form className={styles.settingBox}>
      <h1>Setting Data</h1>
      <div className={styles.settingDataBox}>
        <h3>Input Your UserProfile</h3>
        <div className={styles.profileBox}>
          <div className={styles.imgBox}>
            <label htmlFor="profileImgInput">
              {isFetching ? (
                <Spin />
              ) : (
                <img
                  crossOrigin="anonymous"
                  src={
                    /* eslint-disable no-nested-ternary */
                    newProfileImgURL === ''
                      ? profilePic === ''
                        ? 'https://res.cloudinary.com/dewa3t2gi/image/upload/v1675150372/omlojqzvdujpd3hhtpap.png'
                        : profilePic
                      : newProfileImgURL
                  }
                />
              )}
            </label>
            <input id="profileImgInput" onChange={selectProfileImg} style={{ display: 'none' }} type="file" />
          </div>
          <h3>ID</h3>
          <input defaultValue={id} onChange={(e) => setNewId(e.target.value)} type="text" />
          <h3>Email</h3>
          <input defaultValue={email} onChange={(e) => setNewEmail(e.target.value)} type="email" />
          <h3>Password</h3>
          <input onChange={(e) => setNewPwd(e.target.value)} type="password" />
        </div>
      </div>
      <div className={styles.btnBox}>
        <BasicButton BasicButtonType="small" onClick={updateUserData}>
          Update!
        </BasicButton>
        <BasicButton BasicButtonType="small" className={styles.deleteBtn} onClick={deleteUserData}>
          Delete Your ID!
        </BasicButton>
      </div>
    </form>
  );
};

export default Setting;
