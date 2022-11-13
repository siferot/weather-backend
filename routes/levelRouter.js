const Router = require("express");
const router = new Router();
const levelController = require("../controllers/levelController");

router.get("/getLevel", levelController.getLevel);
router.post("/addWord", levelController.addWord)

module.exports = router;
