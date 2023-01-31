import { useRouter } from 'next/router';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/user';
import { loginReduce } from '../redux/userSlice';
import styles from '../styles/Login.module.css';
import { publicRequest } from '../config';

const Login = () => {
  const idRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const pwdRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const onLogin = async (event: any) => {
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

      router.push('/');
    } catch (error) {
      window.alert(error);
    }
  };

  return (
    <form className={styles.loginBox} onSubmit={onLogin}>
      <div>
        <span>Login</span>
      </div>
      <div className={styles.idBox}>
        <span>ID</span>
        <input ref={idRef} type='text' autoFocus placeholder='Enter your ID' />
      </div>
      <div className={styles.pwdBox}>
        <span>Password</span>
        <input
          ref={pwdRef}
          type='password'
          autoFocus
          placeholder='Enter your Password'
        />
      </div>
      <button type='submit'>Login</button>
    </form>
  );
};

export default Login;
