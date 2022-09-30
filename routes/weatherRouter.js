const Router = require("express");
const router = new Router();
const weatherController = require("../controllers/weatherController");

router.get("/forecast", weatherController.getDayForecast);
router.get("/hoursForecast", weatherController.getHoursForecast);
router.get("/current", weatherController.getCurrentWeather);

module.exports = router;
