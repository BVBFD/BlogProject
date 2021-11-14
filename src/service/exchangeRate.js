class ExchangeRate {
  constructor() {
    this.myHeaders = new Headers();
    this.myHeaders.append(
      "Authorization",
      `Bearer ${process.env.REACT_APP_EXCHANGE_RATE_ACCESS_TOKEN}`,
      "Access-Control-Allow-Origin: *"
    );
    this.myHeaders.append("Content-Type", "application/json");

    this.randomNum = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    };

    this.getDate = () => {
      const dateObj = new Date();
      const year = dateObj.getFullYear();
      const month = dateObj.getMonth() + 1;
      const date = dateObj.getDate();
      const query = `${year}${month > 9 ? month : `0${month}`}${
        date > 9 ? date : `0${date}`
      }`;
      return query;
    };

    this.raw = JSON.stringify({
      Header: {
        ApiNm: "InquireExchangeRate",
        Tsymd: `${this.getDate()}`,
        Trtm: "112428",
        Iscd: "001136",
        FintechApsno: `001`,
        ApiSvcCd: "DrawingTransferA",
        IsTuno: `-${this.randomNum(0, 9)}${this.randomNum(
          0,
          9
        )}${this.randomNum(0, 9)}${this.randomNum(0, 9)}${this.randomNum(
          0,
          9
        )}${this.randomNum(0, 9)}${this.randomNum(0, 9)}${this.randomNum(
          0,
          9
        )}${this.randomNum(0, 9)}${this.randomNum(0, 9)}${this.randomNum(
          0,
          9
        )}${this.randomNum(0, 9)}}${this.randomNum(0, 9)}${this.randomNum(
          0,
          9
        )}${this.randomNum(0, 9)}${this.randomNum(0, 9)}`,
        AccessToken: `${process.env.REACT_APP_EXCHANGE_RATE_ACCESS_TOKEN}`,
      },
      Btb: "0001",
      Crcd: "USD",
      Inymd: "20191213",
    });

    this.requestOptions = {
      method: "POST",
      headers: this.myHeaders,
      body: this.raw,
      redirect: "follow",
    };
  }

  async getExchangeRate() {
    const PROXY = window.location.hostname === "localhost" ? "" : "/proxy";

    try {
      const response = await fetch(
        `${PROXY}/InquireExchangeRate.nh`,
        this.requestOptions
      );
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

export default ExchangeRate;
