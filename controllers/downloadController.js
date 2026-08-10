const db = require("../config/db");

// Add Download
const addDownload = (req, res) => {

    const { document_name, category, description } = req.body;

    const pdfFile = req.files?.find(file => file.fieldname === "pdf");

    const pdf = pdfFile
        ? pdfFile.path.replace(/\\/g, "/")
        : null;

    db.query(
        `INSERT INTO downloads
        (document_name, category, description, pdf)
        VALUES (?, ?, ?, ?)`,
        [document_name, category, description, pdf],
        (err) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                message: "Download Added Successfully"
            });

        }
    );

};

// Get Downloads
const getDownloads = (req, res) => {

    db.query(
        "SELECT * FROM downloads ORDER BY id DESC",
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.json(result);

        }
    );

};

// Update Download
const updateDownload = (req, res) => {

    const { id } = req.params;

    const { document_name, category, description } = req.body;

    db.query(
        `UPDATE downloads
        SET
        document_name=?,
        category=?,
        description=?
        WHERE id=?`,
        [document_name, category, description, id],
        (err) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                message: "Download Updated Successfully"
            });

        }
    );

};

// Delete Download
const deleteDownload = (req, res) => {

    db.query(
        "DELETE FROM downloads WHERE id=?",
        [req.params.id],
        (err) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                message: "Download Deleted Successfully"
            });

        }
    );

};

module.exports = {
    addDownload,
    getDownloads,
    updateDownload,
    deleteDownload
};