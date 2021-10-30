import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

class AuthMobileService {
  constructor(app) {
    this.auth = getAuth(app);
    this.auth.languageCode = "ko";
  }

  configureCaptcha = () => {
    // prettier-ignore
    window.recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        'size': "invisible",
        'callback': (response) => {
          console.log("Recaptca varified");
        },
      },    
      this.auth
    );
  };

  onSignInSubmit = (number) => {
    this.configureCaptcha();
    const phoneNumber = "+82" + number;
    console.log(phoneNumber);

    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(this.auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        console.log("OTP has been sent");
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        console.log(error);
        console.log("SMS not sent");
      });
  };

  onSubmitOTP = (otp, getOnSignUpPage) => {
    console.log(otp);
    window.confirmationResult
      .confirm(otp)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(JSON.stringify(user));
        alert("본인인증이 완료 되었습니다.");
        getOnSignUpPage();
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export default AuthMobileService;
