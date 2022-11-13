const Router = require("express");
const router = new Router();
const levelRouter = require("./levelRouter");

router.use("/levels", levelRouter);

module.exports = router;
