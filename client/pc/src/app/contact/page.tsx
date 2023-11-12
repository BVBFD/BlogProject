import React from 'react';
import styles from './page.module.scss';
import Image from 'next/image';
import ContactImg from '../../../public/imgs/contact.gif';
import Button from 'src/common/Button/Button';

const Contact = () => {
  return (
    <section className={styles.container}>
      <header>Contact</header>
      <main>
        <div className={styles.imgBox}>
          <Image src={ContactImg} alt="contact_img" fill />
        </div>
        <form className={styles.infoBox}>
          <h3>Name</h3>
          <input defaultValue={''} placeholder="Enter your name..." type="text" />

          <h3>Email</h3>
          <input defaultValue={''} placeholder="Enter your Email..." type="email" />

          <h3>Number</h3>
          <input defaultValue={''} placeholder="Enter your Number..." type="number" />

          <h3>Message</h3>
          <textarea defaultValue={''} placeholder="Type your message to me..." />

          <Button
            className={styles.customCSSButton}
            fontSize="1.1rem"
            width="15vh"
            height="2.6rem"
            text="Send Email"
            href={''}
          />
        </form>
      </main>
    </section>
  );
};

export default Contact;
