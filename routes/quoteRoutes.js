const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const controller = require("../controllers/quoteController");

// Add Quote
router.post("/", controller.addQuote);

// Get Quotes
router.get("/", controller.getQuotes);

// Upload Quotation PDF
router.put(
    "/upload/:id",
    upload.any(),
    controller.uploadQuotation
);

// Update Quote Status
router.put("/:id", controller.updateQuote);

// Delete Quote
router.delete("/:id", controller.deleteQuote);

module.exports = router;