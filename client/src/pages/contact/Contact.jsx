import axios from "axios";
import React, { useContext, useState } from "react";
import Header from "../../components/header/Header";
import { Context } from "../../context/context";
import styles from "./Contact.module.css";

const Contact = (props) => {
  const [name, setName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");
  const { id } = useContext(Context);
  const [originEmail, setOriginEmail] = useState(localStorage.getItem("email"));

  const onSendEmail = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/contacts`,
        {
          customerName: name === "" ? id : name,
          email: customerEmail === "" ? originEmail : customerEmail,
          number: number,
          message: message,
        }
      );
      window.alert(
        `${res.data.savedNewContact.customerName} 님 메일 수신이 완료되었습니다!`
      );
    } catch (err) {
      window.alert(err);
    }
  };
  // email 테이블에 post 메서드 이용해서 백엔드에 추가하기!

  return (
    <>
      <Header />
      <section className={styles.contact} id="contact">
        <div className={styles.contactInfoBox}>
          <div className={styles.mapBox}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25871.663134410064!2d129.19037765!3d35.85003605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35664f4cf0d8c903%3A0x8197f8c791bc2f3c!2z7Zmp66as64uo6ri4!5e0!3m2!1sko!2skr!4v1645653851403!5m2!1sko!2skr"
              width="800"
              height="100%"
              style={{ border: 0 }}
              allowfullscreen=""
              loading="lazy"
            ></iframe>
          </div>
          <form onSubmit={onSendEmail} className={styles.infoBox}>
            <label>Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter your name..."
              defaultValue={id}
            />
            <label>Email</label>
            <input
              onChange={(e) => setCustomerEmail(e.target.value)}
              type="email"
              placeholder="Enter your Email..."
              defaultValue={id ? originEmail : customerEmail}
            />
            <label>Number</label>
            <input
              onChange={(e) => setNumber(e.target.value)}
              type="number"
              placeholder="Enter your Number..."
              defaultValue={number}
            />
            <label>Message</label>
            <textarea
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message to me..."
              defaultValue={message}
            ></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
