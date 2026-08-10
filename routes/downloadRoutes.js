const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const controller = require("../controllers/downloadController");

router.post("/", upload.any(), controller.addDownload);

router.get("/", controller.getDownloads);

router.put("/:id", upload.any(), controller.updateDownload);

router.delete("/:id", controller.deleteDownload);

module.exports = router;