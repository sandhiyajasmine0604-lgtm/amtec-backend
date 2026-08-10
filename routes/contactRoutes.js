const express = require("express");

const router = express.Router();

const controller = require("../controllers/contactController");

router.get("/", controller.getContact);

router.put("/", controller.updateContact);

module.exports = router;