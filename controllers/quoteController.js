const db = require("../config/db");

// Add Quote Request
const addQuote = (req, res) => {

    const {
        customer_name,
        company_name,
        email,
        phone,
        product_name,
        quantity,
        city,
        message
    } = req.body;

    const sql = `
        INSERT INTO quote_requests
        (
            customer_name,
            company_name,
            email,
            phone,
            product_name,
            quantity,
            city,
            message
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            customer_name,
            company_name,
            email,
            phone,
            product_name,
            quantity,
            city,
            message
        ],
        (err) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                message: "Quote Request Added Successfully"
            });

        }
    );

};

// Get Quote Requests
const getQuotes = (req, res) => {

    db.query(
        "SELECT * FROM quote_requests ORDER BY id DESC",
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.json(result);

        }
    );

};

// Update Status
const updateQuote = (req, res) => {

    db.query(
        "UPDATE quote_requests SET status=? WHERE id=?",
        [
            req.body.status,
            req.params.id
        ],
        (err) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                message: "Quote Updated Successfully"
            });

        }
    );

};

// Delete
const deleteQuote = (req, res) => {

    db.query(
        "DELETE FROM quote_requests WHERE id=?",
        [req.params.id],
        (err) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                message: "Quote Deleted Successfully"
            });

        }
    );

};

const uploadQuotation = (req, res) => {
console.log("Upload API Hit");
console.log(req.files);
    const { id } = req.params;

    const pdf = req.files?.find(
        file => file.fieldname === "quotation_pdf"
    );

    if (!pdf) {

        return res.status(400).json({
            message: "Please select a PDF"
        });

    }

    db.query(

        `UPDATE quote_requests
        SET quotation_pdf=?
        WHERE id=?`,

        [
            pdf.path.replace(/\\/g, "/"),
            id
        ],

        (err) => {

            if (err)
                return res.status(500).json(err);

            res.json({

                message: "Quotation Uploaded Successfully"

            });

        }

    );

};
module.exports = {

    addQuote,
    getQuotes,
    updateQuote,
    deleteQuote,
    uploadQuotation

};