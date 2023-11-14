import React from 'react';
import Image from 'next/image';
import Button from 'src/common/Button/Button';

import ContactImg from '../../../public/imgs/contact.gif';

import styles from './page.module.scss';

const Contact = () => {
  return (
    <section className={styles.container}>
      <header>Contact</header>
      <main>
        <div className={styles.imgBox}>
          <Image alt="contact_img" fill src={ContactImg} />
        </div>
        <form className={styles.infoBox}>
          <h3>Name</h3>
          <input defaultValue="" placeholder="Enter your name..." type="text" />

          <h3>Email</h3>
          <input defaultValue="" placeholder="Enter your Email..." type="email" />

          <h3>Number</h3>
          <input defaultValue="" placeholder="Enter your Number..." type="number" />

          <h3>Message</h3>
          <textarea defaultValue="" placeholder="Type your message to me..." />

          <Button
            className={styles.customCSSButton}
            fontSize="1.1rem"
            height="2.6rem"
            href=""
            text="Send Email"
            width="15vh"
          />
        </form>
      </main>
    </section>
  );
};

export default Contact;
