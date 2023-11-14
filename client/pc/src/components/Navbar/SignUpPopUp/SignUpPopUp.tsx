import React from 'react';

import PopUp from 'src/common/PopUp/PopUp';
import Button from 'src/common/Button/Button';
import { usePopUp } from 'src/common/context/UsePopUp';

import styles from './SignUpPopUp.module.scss';

const SignUpPopUp = () => {
  const { closePopUp } = usePopUp();

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
              <input placeholder="Enter your ID" type="text" />
            </div>
            <div className={styles.emailBox}>
              <span>Email</span>
              <input placeholder="Enter your Email" type="email" />
            </div>
            <div className={styles.pwdBox}>
              <span>Password</span>
              <input placeholder="Enter your Password" type="password" />
            </div>
            <Button height="2rem" href="" text="Sign-Up" width="5rem" />
          </form>
        }
        footer={<Button height="3rem" href="" onClick={() => closePopUp()} text="Close" width="100%" />}
        isCloseIcon={false}
        title={<header />}
      />
    </div>
  );
};

export default SignUpPopUp;
