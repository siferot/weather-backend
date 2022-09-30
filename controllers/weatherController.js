// const { Brand } = require('../models/models')
// const ApiError = require("../error/ApiError")
const axios = require("axios");

let accuWeathKey = "CZuGbyrkS2NzAmmqxsTvfSnG4MQ2WpiF";
let accuWeathCurrentUrl =
  "http://dataservice.accuweather.com/currentconditions/v1/293149?apikey=" +
  accuWeathKey +
  "&details=true";
let accuWeathHoursForecastUrl =
  "http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/293149?apikey=" +
  accuWeathKey +
  "&metric=true&details=true";
let accuWeathForecastUrl =
  "http://dataservice.accuweather.com/forecasts/v1/daily/5day/293149?apikey=" +
  accuWeathKey +
  "&metric=true&details=true";

class WeatherController {
  async getCurrentWeather(req, res) {
    let result = {};
    axios
      .get(accuWeathCurrentUrl)
      .then((response) => {
        console.log(response);
        // let accuCurrentObj = JSON.parse(response);
        console.log("Accuweather current");

        // console.log(accuCurrentObj);
        console.log(
          response.data[0].WeatherText,
          response.data[0].WeatherIcon,
          response.data[0].Temperature.Metric.Value
        );
        result.text = response.data[0].WeatherText;
        result.icon = response.data[0].WeatherIcon;
        result.temperature = Math.round(
          response.data[0].Temperature.Metric.Value
        );
        console.log(result);
        return res.json(result);
      })
      .catch((error) =>
        res.json(error, { message: "Can't connect to weather server." })
      );
  }

  async getDayForecast(req, res) {
    let result = {};
    axios
      .get(accuWeathForecastUrl)
      .then((response) => {
        // //   console.log("Accuweather forecast");

        // //   accuForecastObj.DailyForecasts.forEach((elem) => {
        // //     console.log(elem.Temperature.Minimum.Value);
        // //     console.log(elem.Temperature.Maximum.Value);
        // //   });
        // //   let tempArr = accuForecastObj.DailyForecasts.map((elem) => {
        // //     const tempMin = elem.Temperature.Minimum.Value;
        // //     const tempMax = elem.Temperature.Maximum.Value;
        // //     return { tempMin: tempMin, tempMax: tempMax };
        // //   });
        // //   console.log(tempArr);
        // let accuCurrentObj = JSON.parse(response);
        console.log("Accuweather forecast");
        let tempArr = response.data.DailyForecasts.map((elem) => {
          const tempMin = Math.round(elem.Temperature.Minimum.Value);
          const tempMax = Math.round(elem.Temperature.Maximum.Value);
          const icon = elem.Day.Icon;
          return { tempMin: tempMin, tempMax: tempMax, icon: icon };
        });

        // console.log(accuCurrentObj);
        console.log(tempArr);
        // result.text = response.data[0].WeatherText;
        // result.icon = response.data[0].WeatherIcon;
        // result.temperature = response.data[0].Temperature.Metric.Value;
        // return res.json(result);
        return res.json(tempArr);
      })
      .catch((error) =>
        res.json(error, { message: "Can't connect to weather server." })
      );
  }

  async getHoursForecast(req, res) {
    let result = {};
    axios
      .get(accuWeathHoursForecastUrl)
      .then((response) => {
        console.log("Accuweather hours");
        let tempArr = response.data.map((elem) => {
          const time = elem.DateTime;
          const temp = Math.round(elem.Temperature.Value);
          const icon = elem.WeatherIcon;
          return { time: time, temp: temp, icon: icon };
        });

        console.log(tempArr);

        return res.json(tempArr);
      })
      .catch((error) =>
        res.json(error, { message: "Can't connect to weather server." })
      );
    return res;
  }
}

module.exports = new WeatherController();
