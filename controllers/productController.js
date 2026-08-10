const db = require("../config/db");

// ==========================
// Add Product
// ==========================
const addProduct = (req, res) => {


    const {
        category_id,
        brand,
        product_name,
        model_number,
        short_description,
        description,
        specifications,
        features,
        price,
        stock
    } = req.body;

const imageFile = req.files?.find(file => file.fieldname === "image");
const datasheetFile = req.files?.find(file => file.fieldname === "datasheet");

const image = imageFile
    ? imageFile.path.replace(/\\/g, "/")
    : null;

const datasheet = datasheetFile
    ? datasheetFile.path.replace(/\\/g, "/")
    : null;


    const sql = `
        INSERT INTO products
        (
            category_id,
            brand,
            product_name,
            model_number,
            short_description,
            description,
            specifications,
            features,
            image,
            datasheet,
            price,
            stock
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        category_id,
        brand,
        product_name,
        model_number,
        short_description,
        description,
        specifications,
        features,
        image,
        datasheet,
        price,
        stock
    ], (err) => {

        if (err)
            return res.status(500).json(err);

        res.status(201).json({
            message: "Product Added Successfully"
        });

    });

};

// ==========================
// Get Products
// ==========================
const getProducts = (req, res) => {

    const sql = `
        SELECT p.*, c.category_name
        FROM products p
        LEFT JOIN categories c
        ON p.category_id = c.id
    `;

    db.query(sql, (err, result) => {

        if (err)
            return res.status(500).json(err);

        res.json(result);

    });

};
// ==========================
// Get Product By ID
// ==========================
const getProductById = (req, res) => {

    const sql = `
        SELECT p.*, c.category_name
        FROM products p
        LEFT JOIN categories c
        ON p.category_id = c.id
        WHERE p.id = ?
    `;

    db.query(sql, [req.params.id], (err, result) => {

        if (err)
            return res.status(500).json(err);

        if (result.length === 0) {

            return res.status(404).json({
                message: "Product not found"
            });

        }

        res.json(result[0]);

    });

};

// ==========================
// Update Product
// ==========================
const updateProduct = (req, res) => {

    const { id } = req.params;

    const {
        category_id,
        brand,
        product_name,
        model_number,
        short_description,
        description,
        specifications,
        features,
        price,
        stock,
        status
    } = req.body;

    const sql = `
        UPDATE products
        SET
            category_id=?,
            brand=?,
            product_name=?,
            model_number=?,
            short_description=?,
            description=?,
            specifications=?,
            features=?,
            price=?,
            stock=?,
            status=?
        WHERE id=?
    `;

    db.query(sql, [
        category_id,
        brand,
        product_name,
        model_number,
        short_description,
        description,
        specifications,
        features,
        price,
        stock,
        status,
        id
    ], (err) => {

        if (err)
            return res.status(500).json(err);

        res.json({
            message: "Product Updated Successfully"
        });

    });

};

// ==========================
// Delete Product
// ==========================
const deleteProduct = (req, res) => {

    const { id } = req.params;

    const sql = "DELETE FROM products WHERE id = ?";

    db.query(sql, [id], (err, result) => {

        if (err)
            return res.status(500).json(err);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json({
            message: "Product Deleted Successfully"
        });

    });

};

// Get Products grouped by Category
const getProductsByCategory = (req, res) => {

    const sql = `
        SELECT
            c.id AS category_id,
            c.category_name,
            p.id,
            p.product_name,
            p.short_description,
            p.image

        FROM categories c

        LEFT JOIN products p
        ON c.id = p.category_id

        ORDER BY c.category_name,
        p.product_name
    `;

    db.query(sql, (err, result) => {

        if (err)
            return res.status(500).json(err);

        res.json(result);

    });

};
// ==========================
// Get Related Products
// ==========================
const getRelatedProducts = (req, res) => {

    const { id } = req.params;

    const sql = `
        SELECT *
        FROM products
        WHERE category_id = (
            SELECT category_id
            FROM products
            WHERE id = ?
        )
        AND id != ?
        LIMIT 4
    `;

    db.query(sql, [id, id], (err, result) => {

        if (err)
            return res.status(500).json(err);

        res.json(result);

    });

};
module.exports = {
    addProduct,
    getProducts,
    getProductById,
    getRelatedProducts,
    updateProduct,
    deleteProduct,
    getProductsByCategory
};