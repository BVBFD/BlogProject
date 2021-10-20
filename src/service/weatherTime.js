class WeatherTime {
  constructor(key) {
    this.key = key;
    this.lat = navigator.geolocation.getCurrentPosition(
      (position) => {
        this.lat = position.coords.latitude;
      },
      (err) => {
        console.log(err);
      }
    );
    this.lon = navigator.geolocation.getCurrentPosition(
      (position) => {
        this.lon = position.coords.longitude;
      },
      (err) => {
        console.log(err);
      }
    );
    this.requestOptions = {
      method: "GET",
      redirect: "follow",
    };
  }

  async getTimeWeather() {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&appid=${this.key}`,
        this.requestOptions
      );

      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

export default WeatherTime;
