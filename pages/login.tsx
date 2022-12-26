import styles from '../styles/Login.module.css';

const login = () => {
  return (
    <>
      <form className={styles.loginBox}>
        <div>
          <span>Login</span>
        </div>
        <div className={styles.idBox}>
          <span>ID</span>
          <input type='text' autoFocus placeholder='Enter your ID' />
        </div>
        <div className={styles.pwdBox}>
          <span>Password</span>
          <input type='text' autoFocus placeholder='Enter your Password' />
        </div>
        <button type='submit'>Login</button>
      </form>
    </>
  );
};

export default login;
