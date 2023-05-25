import PopUp from '@/common/PopUp';
import { usePopUp } from '@/common/UsePopUp';
import { loginReduce } from '@/redux/userSlice';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import BasicButton from '@/common/BasicButton';
import { publicRequest } from '../../../../config';
import styles from './index.module.scss';

const LoginPopup = () => {
  const idRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const pwdRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const dispatch = useDispatch();
  const { closePopUp } = usePopUp();

  const onLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const res = await publicRequest.post(`/loginDatas/login`, {
        userId: idRef.current.value,
        password: pwdRef.current.value,
      });

      dispatch(
        loginReduce({
          userId: res.data.sendLoginData.userId,
          profilePic: res.data.sendLoginData.profilePic,
          editable: res.data.sendLoginData.editable,
          email: res.data.sendLoginData.email,
        })
      );

      closePopUp();
    } catch (error) {
      window.alert(error);
    }
  };

  return (
    <div className={styles.popUpContainer}>
      <PopUp
        content={
          <form className={styles.loginBox}>
            <div>
              <span>Log-in</span>
            </div>
            <div className={styles.idBox}>
              <span>ID</span>
              <input placeholder="Enter your ID" ref={idRef} type="text" />
            </div>
            <div className={styles.pwdBox}>
              <span>Password</span>
              <input placeholder="Enter your Password" ref={pwdRef} type="password" />
            </div>
            <BasicButton BasicButtonType="small" onClick={onLogin}>
              Login
            </BasicButton>
          </form>
        }
        footer={
          <BasicButton className={styles.popUpCloseBtn} onClick={() => closePopUp()}>
            Close
          </BasicButton>
        }
        isCloseIcon={false}
        onClose={() => closePopUp()}
        title={<header />}
      />
    </div>
  );
};

export default LoginPopup;
