import React from 'react';

import Button from 'src/common/Button/Button';
import { usePopUp } from 'src/common/context/UsePopUp';
import PopUp from 'src/common/PopUp/PopUp';

import styles from './LoginPopUp.module.scss';

const LoginPopUp = () => {
  const { closePopUp } = usePopUp();

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
              <input placeholder="Enter your ID" type="text" />
            </div>
            <div className={styles.pwdBox}>
              <span>Password</span>
              <input placeholder="Enter your Password" type="password" />
            </div>
            <Button fontSize="1rem" height="2.1rem" href="" text="Login" width="4.2rem" />
          </form>
        }
        footer={
          <Button
            className={styles.popUpCloseBtn}
            height="3rem"
            href=""
            onClick={() => closePopUp()}
            text="Close"
            width="100%"
          />
        }
        isCloseIcon={false}
        onClose={() => closePopUp()}
        title={<header />}
      />
    </div>
  );
};

export default LoginPopUp;
