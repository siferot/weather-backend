const Router = require("express");
const router = new Router();
const weatherRouter = require("./weatherRouter");
const locationRouter = require("./locationRouter");

router.use("/weather", weatherRouter);
router.use("/location", locationRouter);

module.exports = router;
