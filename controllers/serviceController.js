const db = require("../config/db");
const uploadToCloudinary = require("../utils/cloudinaryUpload");

// ==========================
// Add Service
// ==========================
const addService = async (req, res) => {

    try {

        const {
            service_name,
            short_description,
            description
        } = req.body;

        const image = req.file
            ? await uploadToCloudinary(
                req.file,
                "amtec-technologies/services",
                "image"
            )
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

                if (err) {
                    console.error(err);

                    return res.status(500).json({
                        message: "Database error",
                        error: err.message
                    });
                }

                res.status(201).json({
                    message: "Service Added Successfully",
                    image
                });

            }
        );

    } catch (error) {

        console.error("Cloudinary service upload error:", error);

        res.status(500).json({
            message: "Service upload failed",
            error: error.message
        });

    }

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
const updateService = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            service_name,
            short_description,
            description
        } = req.body;

        // Get existing service
        db.query(
            "SELECT image FROM services WHERE id=?",
            [id],
            async (err, rows) => {

                if (err)
                    return res.status(500).json(err);

                if (rows.length === 0) {

                    return res.status(404).json({
                        message: "Service not found"
                    });

                }

                // Keep existing image if no new image is uploaded
                let image = rows[0].image;

                // Upload new image if provided
                if (req.file) {

                    image = await uploadToCloudinary(
                        req.file,
                        "amtec-technologies/services",
                        "image"
                    );

                }

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

                        if (err) {

                            console.error(err);

                            return res.status(500).json({
                                message: "Database error",
                                error: err.message
                            });

                        }

                        res.json({
                            message: "Service Updated Successfully",
                            image
                        });

                    }
                );

            }
        );

    } catch (error) {

        console.error("Cloudinary service update error:", error);

        res.status(500).json({
            message: "Service update failed",
            error: error.message
        });

    }

};


// ==========================
// Delete Service
// ==========================
const deleteService = (req, res) => {

    db.query(
        "DELETE FROM services WHERE id=?",
        [req.params.id],
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            if (result.affectedRows === 0) {

                return res.status(404).json({
                    message: "Service not found"
                });

            }

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