const db = require("../config/db");

// Add Category
const addCategory = (req, res) => {
    const { category_name } = req.body;

    if (!category_name) {
        return res.status(400).json({
            message: "Category name is required"
        });
    }

    const sql = "INSERT INTO categories(category_name) VALUES(?)";

    db.query(sql, [category_name], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.status(201).json({
            message: "Category Added Successfully"
        });
    });
};

// Get All Categories
const getCategories = (req, res) => {
    db.query("SELECT * FROM categories", (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
};

// Update Category
const updateCategory = (req, res) => {

    const { id } = req.params;
    const { category_name } = req.body;

    db.query(
        "UPDATE categories SET category_name=? WHERE id=?",
        [category_name, id],
        (err) => {

            if (err) return res.status(500).json(err);

            res.json({
                message: "Category Updated Successfully"
            });

        }
    );

};

// Delete Category
const deleteCategory = (req, res) => {

    const { id } = req.params;

    db.query(
        "DELETE FROM categories WHERE id=?",
        [id],
        (err) => {

            if (err) return res.status(500).json(err);

            res.json({
                message: "Category Deleted Successfully"
            });

        }
    );

};


module.exports = {
    addCategory,
    getCategories,
    updateCategory,
    deleteCategory
};