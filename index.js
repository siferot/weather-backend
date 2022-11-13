const express = require("express");
const router = require("./routes/index");
const cors = require("cors");
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();

// let accuWeathKey = "MpKocyANWZoZlzlQZCwxVqRAthXaRddT";
// let accuWeathCurrentUrl =
//   "http://dataservice.accuweather.com/currentconditions/v1/293149?apikey=" +
//   accuWeathKey +
//   "&details=true";
// let accuWeathForecastUrl =
//   "http://dataservice.accuweather.com/forecasts/v1/daily/5day/293149?apikey=" +
//   accuWeathKey +
//   "&metric=true&details=true";

// // req.get({ url: accuWeathForecastUrl }, function (error, r, body) {
// //   if (error) throw new Error(error);
// //   let accuForecastObj = JSON.parse(body);
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
// // });

// req.get({ url: accuWeathCurrentUrl }, function (error, r, body) {
//   if (error) throw new Error(error);
//   let accuCurrentObj = JSON.parse(body);
//   console.log("Accuweather current");

//   // console.log(accuCurrentObj);
//   console.log(
//     accuCurrentObj[0].WeatherText,
//     accuCurrentObj[0].WeatherIcon,
//     accuCurrentObj[0].Temperature.Metric.Value
//   );
// });
