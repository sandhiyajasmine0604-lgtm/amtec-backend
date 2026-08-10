const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const controller = require("../controllers/productController");


// Add Product
router.post("/", upload.any(), controller.addProduct);

// Get All Products
router.get("/", controller.getProducts);

// Get Products By Category
router.get("/categories/all", controller.getProductsByCategory);

// Related Products
router.get("/related/:id", controller.getRelatedProducts);

// Get Single Product  <-- KEEP THIS LAST
router.get("/:id", controller.getProductById);

// Update Product
router.put("/:id", upload.any(), controller.updateProduct);

// Delete Product
router.delete("/:id", controller.deleteProduct);

module.exports = router;