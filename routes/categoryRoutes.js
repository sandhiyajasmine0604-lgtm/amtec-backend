const express = require("express");
const router = express.Router();

const controller = require("../controllers/categoryController");

// Add Category
router.post("/", controller.addCategory);

// Get Categories
router.get("/", controller.getCategories);

// Update Category
router.put("/:id", controller.updateCategory);

// Delete Category
router.delete("/:id", controller.deleteCategory);

module.exports = router;