import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/user';
import { loginReduce, logoutReduce } from '../redux/userSlice';
import styles from '../styles/Setting.module.css';
import { publicRequest } from '../config';

const Setting = () => {
  const { id, email, profilePic } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch();
  const [newProfileImgURL, setNewProfileImgURL] = useState('');
  const [newId, setNewId] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const router = useRouter();

  const [isFetching, setIsFetching] = useState(false);

  const selectProfileImg = async (e: any) => {
    if (e.target.files[0]) {
      const data = new FormData();
      const filename = `${Date.now()}${e.target.files[0].name}`;
      data.append('name', filename);
      data.append('file', e.target.files[0]);
      try {
        setIsFetching(true);
        const response = await fetch(`https://api.lsevina126.asia/pic/upload`, {
          method: 'POST',
          mode: 'cors',
          body: data,
        });
        const updatedPicURL = await response.json();
        setNewProfileImgURL(updatedPicURL);
        setIsFetching(false);
      } catch (err) {
        setIsFetching(false);
        window.alert(err);
      }
    }
  };

  const updateUserData = async (event: any) => {
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

  const deleteUserData = async (e: any) => {
    try {
      await publicRequest.delete(`/loginDatas/delete`, {
        data: { userId: id },
      });
      dispatch(logoutReduce());
      router.push('/');
    } catch (err) {
      window.alert(err);
    }
  };

  return (
    <form className={styles.settingBox} onSubmit={updateUserData}>
      <h1>Setting Data</h1>
      <div className={styles.settingDataBox}>
        <h3>Input Your UserProfile</h3>
        <div className={styles.profileBox}>
          <div className={styles.imgBox}>
            <label htmlFor='profileImgInput'>
              {isFetching ? (
                <CircularProgress />
              ) : (
                <img
                  src={
                    newProfileImgURL === ''
                      ? profilePic === ''
                        ? 'https://res.cloudinary.com/dewa3t2gi/image/upload/v1675150372/omlojqzvdujpd3hhtpap.png'
                        : profilePic
                      : newProfileImgURL
                  }
                  crossOrigin='anonymous'
                />
              )}
            </label>
            <input
              type='file'
              id='profileImgInput'
              style={{ display: 'none' }}
              onChange={selectProfileImg}
            />
          </div>
          <label>ID</label>
          <input
            type='text'
            defaultValue={id}
            onChange={(e) => setNewId(e.target.value)}
          />
          <label>Email</label>
          <input
            type='email'
            defaultValue={email}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <label>Password</label>
          <input type='password' onChange={(e) => setNewPwd(e.target.value)} />
        </div>
      </div>
      <button type='submit'>Update</button>
      <button onClick={deleteUserData} className={styles.deleteBtn}>
        Delete Your ID!
      </button>
    </form>
  );
};

export default Setting;
