import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/sliceStore';
import BasicButton from '@/common/BasicButton';
import styles from '../../styles/contact/index.module.scss';
import useEmail from '@/hooks/useEmail';

const Contact = () => {
  const [name, setName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [number, setNumber] = useState('');
  const [message, setMessage] = useState('');
  const { id, email } = useSelector((user: RootState) => user.user);
  const [originEmail, setOriginEmail] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(false);

  const { onSendEmail } = useEmail();

  const handeleSendEmail = (event: React.MouseEvent) => {
    return onSendEmail(event, name, customerEmail, originEmail, message, number, setBtnDisabled);
  };

  useEffect(() => {
    setOriginEmail(email);
  }, [email]);

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
          <BasicButton BasicButtonType="medium" disabled={btnDisabled} onClick={handeleSendEmail}>
            Send Message
          </BasicButton>
        </form>
      </div>
    </section>
  );
};

export default Contact;
