const db = require("../config/db");
const uploadToCloudinary = require("../utils/cloudinaryUpload");

// ==========================
// Add Product
// ==========================
const addProduct = async (req, res) => {

    try {

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
         
        const stock =
    req.body.stock === "" ||
    req.body.stock === undefined ||
    req.body.stock === null
        ? 0
        : Number(req.body.stock);
         

const stock =
    req.body.stock === "" ||
    req.body.stock === undefined ||
    req.body.stock === null
        ? 0
        : Number(req.body.stock);

        const imageFile = req.files?.find(
            file => file.fieldname === "image"
        );

        const datasheetFile = req.files?.find(
            file => file.fieldname === "datasheet"
        );

        // Upload image to Cloudinary
        const imageResult = imageFile
    ? await uploadToCloudinary(
        imageFile,
        "amtec-technologies/products",
        "image"
    )
    : null;

const image = imageResult?.url || null;

        // Upload datasheet to Cloudinary
       const datasheetResult = datasheetFile
    ? await uploadToCloudinary(
        datasheetFile,
        "amtec-technologies/datasheets",
        "raw"
    )
    : null;

const datasheet = datasheetResult?.url || null;

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

            if (err) {
                console.error(err);

                return res.status(500).json({
                    message: "Database error",
                    error: err.message
                });
            }

            res.status(201).json({
                message: "Product Added Successfully",
                image,
                datasheet
            });

        });

    } catch (error) {

        console.error("Cloudinary upload error:", error);

        res.status(500).json({
            message: "Product upload failed",
            error: error.message
        });

    }

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
// ==========================
// Update Product
// ==========================
const updateProduct = async (req, res) => {

    try {

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

        // Find uploaded files
        const imageFile = req.files?.find(
            file => file.fieldname === "image"
        );

        const datasheetFile = req.files?.find(
            file => file.fieldname === "datasheet"
        );

        // Get existing product
        const selectSql = `
            SELECT image, datasheet
            FROM products
            WHERE id = ?
        `;

        db.query(selectSql, [id], async (selectErr, result) => {

            if (selectErr) {

                console.error(selectErr);

                return res.status(500).json({
                    message: "Database error",
                    error: selectErr.message
                });

            }

            if (result.length === 0) {

                return res.status(404).json({
                    message: "Product not found"
                });

            }

            // Keep existing Cloudinary URLs
            let image = result[0].image;
            let datasheet = result[0].datasheet;

            // ==========================
            // Upload New Image
            // ==========================

            if (imageFile) {

    const imageResult = await uploadToCloudinary(
        imageFile,
        "amtec-technologies/products",
        "image"
    );

    image = imageResult?.url || image;

}

            // ==========================
            // Upload New Datasheet
            // ==========================

            if (datasheetFile) {

    const datasheetResult = await uploadToCloudinary(
        datasheetFile,
        "amtec-technologies/datasheets",
        "raw"
    );

    datasheet = datasheetResult?.url || datasheet;

}

            // ==========================
            // Update Database
            // ==========================

            const updateSql = `
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
                    image=?,
                    datasheet=?,
                    price=?,
                    stock=?,
                    status=?
                WHERE id=?
            `;

            db.query(
                updateSql,
                [
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
                    stock,
                    status,
                    id
                ],
                (updateErr) => {

                    if (updateErr) {

                        console.error(updateErr);

                        return res.status(500).json({
                            message: "Database update failed",
                            error: updateErr.message
                        });

                    }

                    res.json({
                        message: "Product Updated Successfully",
                        image,
                        datasheet
                    });

                }
            );

        });

    } catch (error) {

        console.error("Cloudinary update error:", error);

        return res.status(500).json({
            message: "Product update failed",
            error: error.message
        });

    }

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