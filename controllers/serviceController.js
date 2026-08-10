const db = require("../config/db");

// ==========================
// Add Service
// ==========================
// Add Service
const addService = (req, res) => {

    const {
        service_name,
        short_description,
        description
    } = req.body;

    const image = req.file
        ? req.file.path.replace(/\\/g, "/")
        : null;

    const sql = `
        INSERT INTO services
        (
            service_name,
            short_description,
            description,
            image
        )
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            service_name,
            short_description,
            description,
            image
        ],
        (err) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                message: "Service Added Successfully"
            });

        }
    );

};

// ==========================
// Get Services
// ==========================
const getServices = (req, res) => {

    db.query(
        "SELECT * FROM services ORDER BY id DESC",
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.json(result);

        }
    );

};

// ==========================
// Get Service By ID
// ==========================
const getServiceById = (req, res) => {

    db.query(
        "SELECT * FROM services WHERE id=?",
        [req.params.id],
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            if (result.length === 0) {

                return res.status(404).json({
                    message: "Service not found"
                });

            }

            res.json(result[0]);

        }
    );

};

// ==========================
// Update Service
// ==========================
// Update Service
const updateService = (req, res) => {

    const { id } = req.params;

    const {
        service_name,
        short_description,
        description
    } = req.body;

    db.query(

        "SELECT image FROM services WHERE id=?",

        [id],

        (err, rows) => {

            if (err)
                return res.status(500).json(err);

            if (rows.length === 0) {

                return res.status(404).json({
                    message: "Service not found"
                });

            }

            const image = req.file
                ? req.file.path.replace(/\\/g, "/")
                : rows[0].image;

            const sql = `
                UPDATE services
                SET
                    service_name=?,
                    short_description=?,
                    description=?,
                    image=?
                WHERE id=?
            `;

            db.query(

                sql,

                [
                    service_name,
                    short_description,
                    description,
                    image,
                    id
                ],

                (err) => {

                    if (err)
                        return res.status(500).json(err);

                    res.json({
                        message: "Service Updated Successfully"
                    });

                }

            );

        }

    );

};

// ==========================
// Delete Service
// ==========================
const deleteService = (req, res) => {

    db.query(
        "DELETE FROM services WHERE id=?",
        [req.params.id],
        (err) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                message: "Service Deleted Successfully"
            });

        }
    );

};

module.exports = {

    addService,
    getServices,
    getServiceById,
    updateService,
    deleteService

};