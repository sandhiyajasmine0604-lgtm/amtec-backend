const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

require("./config/db");

const adminRoutes = require("./routes/adminRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const downloadRoutes = require("./routes/downloadRoutes");
const quoteRoutes = require("./routes/quoteRoutes");
const contactRoutes = require("./routes/contactRoutes");
const solutionRoutes = require("./routes/solutionRoutes");

console.log(downloadRoutes);
console.log("Admin Routes Loaded");
console.log("Product Routes Loaded");

const app = express();

app.use(cors({ origin: [ "https://sandhiyajasmine0604-lgtm.github.io", "http://127.0.0.1:5500", "http://localhost:5500" ], methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
    res.send("Welcome to Amtec Technologies API 🚀");
});
app.get("/api/test", (req, res) => {
    res.send("API Working");
});
app.use("/api/admin", adminRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/downloads", downloadRoutes);
app.use("/api/quotes", quoteRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/solutions", solutionRoutes);
console.log("Solution Routes Loaded");
// Error handler (keep LAST)
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        error: err.message
    });
});


const PORT = process.env.PORT;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
});