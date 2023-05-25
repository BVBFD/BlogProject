import PopUp from '@/common/PopUp';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { usePopUp } from '@/common/UsePopUp';
import BasicButton from '@/common/BasicButton';
import { loginReduce } from '@/redux/userSlice';
import { publicRequest } from '../../../../config';
import styles from './index.module.scss';

type UserDataType = {
  userId: string;
  password: string;
  email: string;
  profilePic: string;
  editable: boolean;
};

const SignupPopUp = () => {
  const [user, setUser] = useState<UserDataType>({
    userId: '',
    password: '',
    email: '',
    profilePic: '',
    editable: false,
  });
  const [loginSuccess, setLoginSuccess] = useState(false);
  const dispatch = useDispatch();
  const { closePopUp } = usePopUp();

  useEffect(() => {}, [user]);

  const onSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const res = await publicRequest.post(`/loginDatas/signup`, user);

      dispatch(
        loginReduce({
          userId: res.data.data.userId,
          profilePic: res.data.data.profilePic,
          editable: res.data.data.editable,
          email: res.data.data.email,
        })
      );
    } catch (error) {
      window.alert(error);
    }
    setLoginSuccess(true);
  };

  if (loginSuccess) {
    closePopUp();
  }

  const returnObject = (key: string, value: string) => {
    switch (key) {
      case 'userId':
        return {
          ...user,
          userId: value,
        };

      case 'email':
        return {
          ...user,
          email: value,
        };

      case 'password':
        return {
          ...user,
          password: value,
        };

      default:
        return user;
    }
  };

  return (
    <div className={styles.popUpContainer}>
      <PopUp
        content={
          <form className={styles.signupBox}>
            <div>
              <span>Sign-up</span>
            </div>
            <div className={styles.idBox}>
              <span>ID</span>
              <input
                onChange={(e) => setUser(returnObject('userId', `${e.target.value}`) as UserDataType)}
                placeholder="Enter your ID"
                type="text"
              />
            </div>
            <div className={styles.emailBox}>
              <span>Email</span>
              <input
                onChange={(e) => setUser(returnObject('email', `${e.target.value}`) as UserDataType)}
                placeholder="Enter your Email"
                type="email"
              />
            </div>
            <div className={styles.pwdBox}>
              <span>Password</span>
              <input
                onChange={(e) => setUser(returnObject('password', `${e.target.value}`) as UserDataType)}
                placeholder="Enter your Password"
                type="password"
              />
            </div>
            <BasicButton BasicButtonType="small" onClick={onSignUp}>
              Sign-Up
            </BasicButton>
          </form>
        }
        footer={
          <BasicButton className={styles.popUpCloseBtn} onClick={() => closePopUp()}>
            Close
          </BasicButton>
        }
        isCloseIcon={false}
        title={<header />}
      />
    </div>
  );
};

export default SignupPopUp;
