const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin");

router.post("/dashboard",adminController.displayAll);
router.put("/status",adminController.changeStatus);
router.put("/type",adminController.changeType);

module.exports = router;