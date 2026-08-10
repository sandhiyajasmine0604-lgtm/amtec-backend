const express = require("express");
const router = express.Router();


const upload = require("../config/serviceUpload");

const controller = require("../controllers/serviceController");

// Add Service
router.post(
    "/",
    upload.single("image"),
    controller.addService
);

// Get All Services
router.get(
    "/",
    controller.getServices
);

// Get Single Service
router.get(
    "/:id",
    controller.getServiceById
);

// Update Service
router.put(
    "/:id",
    upload.single("image"),
    controller.updateService
);

// Delete Service
router.delete(
    "/:id",
    controller.deleteService
);

module.exports = router;