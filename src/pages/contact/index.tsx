import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/user';
import BasicButton from '@/common/BasicButton';
import emailjs from '@emailjs/browser';
import styles from '../../styles/contact/index.module.scss';

const Contact = () => {
  const [name, setName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [number, setNumber] = useState('');
  const [message, setMessage] = useState('');
  const { id, email } = useSelector((user: RootState) => user.user);
  const [originEmail, setOriginEmail] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(false);

  useEffect(() => {
    setOriginEmail(email);
  }, [email]);

  const onSendEmail = async (event: React.MouseEvent) => {
    event.preventDefault();
    setBtnDisabled(true);

    function isEmailValid(emailValidVar: string) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValidVar) && emailValidVar.includes('.');
    }

    if (!isEmailValid(customerEmail)) {
      window.alert(`정확한 이메일 형식 부탁해요. 이메일이 보내기가 실패했습니다!`);
      setBtnDisabled(false);
      return;
    }

    if (name !== '' && (customerEmail !== '' || originEmail !== '') && message !== '') {
      emailjs
        .send(
          `${process.env.NEXT_PUBLIC_Gmail_Service_ID}`,
          `${process.env.NEXT_PUBLIC_Gamil_Template_ID}`,
          {
            from_name: name,
            from_email: originEmail || customerEmail,
            message: `${message} Number is ${number}`,
          },
          process.env.NEXT_PUBLIC_Gmail_Public_Key
        )
        .then(
          function onSuccess() {
            window.alert('이메일이 성공적으로 보내어졌습니다!!!');
            setBtnDisabled(false);
          },
          function onFailure() {
            window.alert(`이메일이 보내기가 실패했습니다!!!`);
            setBtnDisabled(false);
          }
        );
    } else {
      window.alert(`이메일이 보내기가 실패했습니다!!!`);
      setBtnDisabled(false);
    }
  };

  return (
    <section className={styles.contact} id="contact">
      <div className={styles.contactInfoBox}>
        <div className={styles.mapBox} />
        <form className={styles.infoBox}>
          <h3>Name</h3>
          <input
            defaultValue={id !== '' ? id : name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name..."
            required
            type="text"
          />
          <h3>Email</h3>
          <input
            defaultValue={id !== '' ? originEmail : customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            placeholder="Enter your Email..."
            required
            type="email"
          />
          <h3>Number</h3>
          <input
            defaultValue={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="Enter your Number..."
            type="number"
          />
          <h3>Message</h3>
          <textarea
            defaultValue={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message to me..."
            required
          />
          <BasicButton BasicButtonType="medium" disabled={btnDisabled} onClick={onSendEmail}>
            Send Message
          </BasicButton>
        </form>
      </div>
    </section>
  );
};

export default Contact;
