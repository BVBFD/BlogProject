import emailjs from '@emailjs/browser';

const useEmail = () => {
  const isEmailValid = (emailValidVar: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValidVar) && emailValidVar.includes('.');
  };

  const onSendEmail = async (
    event: React.MouseEvent,
    name: string,
    customerEmail: string,
    originEmail: string,
    message: string,
    number: string,
    setBtnDisabled: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    event.preventDefault();
    setBtnDisabled(true);

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

  return { onSendEmail };
};

export default useEmail;
