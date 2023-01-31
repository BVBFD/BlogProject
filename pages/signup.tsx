import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginReduce } from '../redux/userSlice';
import styles from '../styles/Signup.module.css';
import { publicRequest } from '../config';

type UserDataType = {
  userId: string;
  password: string;
  email: string;
  profilePic: string;
  editable: boolean;
};

type ReturnObjectType = (key: string, value: string) => any;

const Signup = () => {
  const [user, setUser] = useState<UserDataType | ReturnObjectType>({
    userId: '',
    password: '',
    email: '',
    profilePic: '',
    editable: false,
  });
  const [loginSuccess, setLoginSuccess] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    console.log(user);
  }, [user]);

  const onSignUp = async (event: any) => {
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
      console.log(error);
    }
    setLoginSuccess(true);
  };

  loginSuccess && router.push('/');

  const returnObject: ReturnObjectType = (key: string, value: string) => {
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
    }
  };

  return (
    <form className={styles.signupBox} onSubmit={onSignUp}>
      <div>
        <span>Sign-up</span>
      </div>
      <div className={styles.idBox}>
        <span>ID</span>
        <input
          onChange={(e) => setUser(returnObject('userId', `${e.target.value}`))}
          type='text'
          autoFocus
          placeholder='Enter your ID'
        />
      </div>
      <div className={styles.emailBox}>
        <span>Email</span>
        <input
          onChange={(e) => setUser(returnObject('email', `${e.target.value}`))}
          type='email'
          autoFocus
          placeholder='Enter your Email'
        />
      </div>
      <div className={styles.pwdBox}>
        <span>Password</span>
        <input
          onChange={(e) =>
            setUser(returnObject('password', `${e.target.value}`))
          }
          type='password'
          placeholder='Enter your Password'
        />
      </div>
      <button type='submit'>Sign-Up</button>
    </form>
  );
};

export default Signup;
