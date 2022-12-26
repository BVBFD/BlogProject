import styles from '../styles/Signup.module.css';

const signup = () => {
  return (
    <form className={styles.signupBox}>
      <div>
        <span>Sign-up</span>
      </div>
      <div className={styles.idBox}>
        <span>ID</span>
        <input type='text' autoFocus placeholder='Enter your ID' />
      </div>
      <div className={styles.emailBox}>
        <span>Email</span>
        <input type='email' autoFocus placeholder='Enter your Email' />
      </div>
      <div className={styles.pwdBox}>
        <span>Password</span>
        <input type='password' placeholder='Enter your Password' />
      </div>
      <button type='submit'>Sign-Up</button>
    </form>
  );
};

export default signup;
