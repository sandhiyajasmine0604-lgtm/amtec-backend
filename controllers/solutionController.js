const db = require("../config/db");

// ==========================
// Add Solution
// ==========================
const addSolution = (req, res) => {

    const {
        title,
        short_description,
        description
    } = req.body;

    const image = req.file
        ? req.file.path.replace(/\\/g, "/")
        : null;

    const sql = `
        INSERT INTO solutions
        (
            title,
            short_description,
            description,
            image
        )
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            title,
            short_description,
            description,
            image
        ],
        (err) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                message: "Solution Added Successfully"
            });

        }
    );

};

// ==========================
// Get Solutions
// ==========================
const getSolutions = (req, res) => {

    db.query(
        "SELECT * FROM solutions ORDER BY id DESC",
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.json(result);

        }
    );

};
const deleteSolution = (req, res) => {

    const { id } = req.params;

    db.query(
        "DELETE FROM solutions WHERE id = ?",
        [id],
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Solution not found"
                });
            }

            res.json({
                message: "Solution Deleted Successfully"
            });

        }
    );

};
// ==========================
// Get Single Solution
// ==========================
const getSolutionById = (req, res) => {

    db.query(
        "SELECT * FROM solutions WHERE id = ?",
        [req.params.id],
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            if (result.length === 0) {
                return res.status(404).json({
                    message: "Solution not found"
                });
            }

            res.json(result[0]);

        }
    );

};
// ==========================
// Update Solution
// ==========================
const updateSolution = (req, res) => {

    const { id } = req.params;

    const {
        title,
        short_description,
        description
    } = req.body;

    let image = null;

    if (req.file) {
        image = req.file.path.replace(/\\/g, "/");
    }

    let sql;
    let values;

    if (image) {

        sql = `
        UPDATE solutions
        SET
            title=?,
            short_description=?,
            description=?,
            image=?
        WHERE id=?`;

        values = [
            title,
            short_description,
            description,
            image,
            id
        ];

    } else {

        sql = `
        UPDATE solutions
        SET
            title=?,
            short_description=?,
            description=?
        WHERE id=?`;

        values = [
            title,
            short_description,
            description,
            id
        ];

    }

    db.query(sql, values, (err) => {

        if (err)
            return res.status(500).json(err);

        res.json({
            message: "Solution Updated Successfully"
        });

    });

};
console.log("Controller exports:", {
    addSolution,
    getSolutions,
    deleteSolution
});
module.exports = {
    addSolution,
    getSolutions,
    getSolutionById,
    updateSolution,
    deleteSolution
};