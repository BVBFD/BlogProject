import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/user';
import BasicButton from '@/common/BasicButton';
import styles from '../../styles/contact/index.module.scss';
import { publicRequest } from '../../../config';

const Contact = () => {
  const [name, setName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [number, setNumber] = useState('');
  const [message, setMessage] = useState('');
  const { id, email } = useSelector((user: RootState) => user.user);
  const [originEmail, setOriginEmail] = useState('');

  useEffect(() => {
    setOriginEmail(email);
  }, [email]);

  const onSendEmail = async (event: React.MouseEvent) => {
    event.preventDefault();
    try {
      const res = await publicRequest.post(`/contacts`, {
        customerName: name === '' ? id : name,
        email: customerEmail === '' ? originEmail : customerEmail,
        number,
        message,
      });
      window.alert(`${res.data.savedNewContact.customerName} email sent!!`);
    } catch (err) {
      window.alert(err);
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
            type="text"
          />
          <h3>Email</h3>
          <input
            defaultValue={id !== '' ? originEmail : customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            placeholder="Enter your Email..."
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
          />
          <BasicButton BasicButtonType="medium" onClick={onSendEmail}>
            Send Message
          </BasicButton>
        </form>
      </div>
    </section>
  );
};

export default Contact;
