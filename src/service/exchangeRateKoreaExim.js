class ExchangeRateKoreaExim {
  constructor() {
    this.myHeaders = new Headers();
    this.myHeaders.append(
      "Cookie",
      `JSESSIONID=231EAF4138EFAB9273AA5097ADA50EBD`,
      "Access-Control-Allow-Origin: *"
    );
    this.requestOptions = {
      method: "GET",
      headers: this.myHeaders,
      redirect: "follow",
    };

    // this.time = document.querySelectorAll("time")[1].innerText;

    // console.log("11:00:00 am");
    // console.log(this.time > "11:00:00 am");

    this.dateObj = new Date();
    this.year = this.dateObj.getFullYear();
    this.month = this.dateObj.getMonth() + 1;
    this.date = this.dateObj.getDate();
    this.query =
      `${this.year}${this.month > 9 ? this.month : `0${this.month}`}${
        this.date > 9 ? this.date : `0${this.date}`
      }` > "11:00:00 am"
        ? `${this.year}${this.month > 9 ? this.month : `0${this.month}`}${
            this.date > 9 ? this.date : `0${this.date}`
          }`
        : `${this.year}${this.month > 9 ? this.month : `0${this.month}`}${
            this.date - 1 > 9 ? this.date - 1 : `0${this.date - 1}`
          }`;
  }

  async getExchangeRateKoreaExim() {
    const PROXY = window.location.hostname === "localhost" ? "" : "/proxy";

    try {
      const response = await fetch(
        `${PROXY}/exchangeJSON?authkey=${process.env.REACT_APP_KoreaEximBank_authkey}&searchdate=${this.query}&data=AP01`,
        this.requestOptions
      );
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

export default ExchangeRateKoreaExim;
