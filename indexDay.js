var req = require("request");

var yandexUrl =
  "https://api.weather.yandex.ru/v2/informers?lat=48.52771&lon=135.16778";
var yandexHeaders = {
  "X-Yandex-API-Key": "8412e5c6-754f-4ead-b108-6ed6d211e28d",
};

function Temp() {
  this.startTime = this.startTime;
  this.minTemp = minTemp;
  this.maxTemp = maxTemp;
  this.minFeelsLike = minFeelsLike;
  this.maxFeelsLike = maxFeelsLike;
  this.wind = wind;
}

req.get({ url: yandexUrl, headers: yandexHeaders }, function (error, r, body) {
  if (error) throw new Error(error);
  var yandexObj = JSON.parse(body);
  console.log("Yandex");
  console.log(`Температура сейчас ${yandexObj.fact.temp}`);
  console.log(`Ощущается как ${yandexObj.fact.feels_like}`);
  console.log(`Скорость ветра ${yandexObj.fact.wind_speed}`);
  console.log("Yandex прогноз");
  console.log(
    `Температура ${yandexObj.forecast.parts[0].temp_min} - ${yandexObj.forecast.parts[0].temp_max}`
  );
  console.log(`Ощущается как ${yandexObj.forecast.parts[0].feels_like}`);
  console.log(`Скорость ветра ${yandexObj.forecast.parts[0].wind_speed}`);
});

var accuWeathKey = "L3Y2VU4BVWVIbqQmv30hWActWisPGaMA";
var accuWeathForecastUrl =
  "http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/293149?apikey=" +
  accuWeathKey +
  "&language=ru-RU&metric=true&details=true";
var accuWeathCurrentUrl =
  "http://dataservice.accuweather.com/currentconditions/v1/293149?apikey=" +
  accuWeathKey +
  "&language=ru-RU&metric=true&details=true";

req.get({ url: accuWeathCurrentUrl }, function (error, r, body) {
  if (error) throw new Error(error);
  var accuCurrentObj = JSON.parse(body);
  console.log("Accuweather");
  console.log(
    `Температура сейчас ${accuCurrentObj[0].Temperature.Metric.Value}`
  );
  console.log(
    `Ощущается как ${accuCurrentObj[0].RealFeelTemperature.Metric.Value}`
  );
  console.log(
    `Скорость ветра ${accuCurrentObj[0].Wind.Speed.Metric.Value / 3.6}`
  );
});

req.get({ url: accuWeathForecastUrl }, function (error, r, body) {
  if (error) throw new Error(error);
  var accuForecastObj = JSON.parse(body);
  console.log("Accuweather forecast");
  let currentDate = new Date();

  let currentHour = currentDate.getHours() + 1;
  let nextPeriodStart = Math.ceil(currentDate.getHours() / 6) * 6;
  let timeDelta = nextPeriodStart - currentHour;

  let startTime = new Date();
  startTime.setMinutes(startTime.getMinutes() - startTime.getTimezoneOffset());
  console.log(startTime);
  startTime.setHours(startTime.getHours() + timeDelta + 1, 0, 0, 0);
  let minTemp, maxTemp, minFeelsLike, maxFeelsLike, wind;

  for (let i = timeDelta; i < timeDelta + 6; i++) {
    if (!minTemp) {
      minTemp = accuForecastObj[i].Temperature.Value;
      maxTemp = accuForecastObj[i].Temperature.Value;
      minFeelsLike = accuForecastObj[i].RealFeelTemperature.Value;
      maxFeelsLike = accuForecastObj[i].RealFeelTemperature.Value;
      wind = accuForecastObj[i].Wind.Speed.Value;
    } else {
      minTemp =
        accuForecastObj[i].Temperature.Value < minTemp
          ? accuForecastObj[i].Temperature.Value
          : minTemp;
      maxTemp =
        accuForecastObj[i].Temperature.Value > maxTemp
          ? accuForecastObj[i].Temperature.Value
          : maxTemp;
      minFeelsLike =
        accuForecastObj[i].RealFeelTemperature.Value < minFeelsLike
          ? accuForecastObj[i].RealFeelTemperature.Value
          : minFeelsLike;
      maxFeelsLike =
        accuForecastObj[i].RealFeelTemperature.Value > maxFeelsLike
          ? accuForecastObj[i].RealFeelTemperature.Value
          : maxFeelsLike;
      wind += accuForecastObj[i].Wind.Speed.Value;
    }
  }
  let feelsLike = (minFeelsLike + maxFeelsLike) / 2;
  wind /= 6 * 3.6; // Находим среднее и переводим км/ч в м/с
  console.log(startTime);
  console.log(`Температура ${minTemp} - ${maxTemp}`);
  console.log(`Ощущается как ${feelsLike}`);
  console.log(`Скорость ветра ${wind.toFixed(1)}`);
});
