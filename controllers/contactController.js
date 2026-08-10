const db = require("../config/db");

// Get Contact Details
const getContact = (req, res) => {

    db.query(
        "SELECT * FROM contact_details LIMIT 1",
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.json(result[0]);

        }
    );

};

// Update Contact Details
const updateContact = (req, res) => {

    const {

        company_name,
        address,
        phone1,
        phone2,
        email,
        whatsapp,
        google_map,
        working_hours,
        facebook,
        instagram,
        linkedin,
        youtube

    } = req.body;

    db.query(

        `UPDATE contact_details
        SET
        company_name=?,
        address=?,
        phone1=?,
        phone2=?,
        email=?,
        whatsapp=?,
        google_map=?,
        working_hours=?,
        facebook=?,
        instagram=?,
        linkedin=?,
        youtube=?
        WHERE id=1`,

        [

            company_name,
            address,
            phone1,
            phone2,
            email,
            whatsapp,
            google_map,
            working_hours,
            facebook,
            instagram,
            linkedin,
            youtube

        ],

        (err) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                message: "Contact Details Updated Successfully"
            });

        }

    );

};

module.exports = {

    getContact,
    updateContact

};