const express = require("express");
const router = express.Router();

const memberController = require("../controllers/directory");
const multer = require("../middleware/multer-config");

router.post("/member", multer, memberController.register);

router.get("/member/:id", memberController.displayOne);
router.get("/member", memberController.displayAll);

module.exports = router;