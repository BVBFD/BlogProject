import styles from '../styles/Contact.module.css';

const contact = () => {
  return (
    <section className={styles.contact}>
      <div className={styles.contactInfoBox}>
        <div className={styles.mapBox}></div>
        <form className={styles.infoBox}>
          <label>Name</label>
          <input type='text' placeholder='Enter your name...' />
          <label>Email</label>
          <input type='email' placeholder='Enter your email...' />
          <label>Number</label>
          <input type='number' placeholder='Enter your Number...' />
          <label>Message</label>
          <textarea placeholder='Type your message to me...'></textarea>
          <button type='submit'>Send Message</button>
        </form>
      </div>
    </section>
  );
};

export default contact;
