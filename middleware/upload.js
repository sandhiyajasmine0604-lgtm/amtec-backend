const multer = require("multer");

// Storage Configuration
const storage = multer.diskStorage({
destination: function (req, file, cb) {

    if (file.fieldname === "image") {

        cb(null, "uploads/products");

    }

    else if (file.fieldname === "datasheet") {

        cb(null, "uploads/datasheets");

    }
    else if (file.fieldname === "quotation_pdf") {
    cb(null, "uploads/quotations");
}

    else if (file.fieldname === "pdf") {

        cb(null, "uploads/downloads");

    }

},

    filename: function (req, file, cb) {
        const uniqueName =
            Date.now() + "-" + file.originalname.replace(/\s+/g, "_");

        cb(null, uniqueName);
    }
});

// File Filter
const fileFilter = (req, file, cb) => {

    if (file.fieldname === "image") {

        if (
            file.mimetype === "image/jpeg" ||
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg"
        ) {
            return cb(null, true);
        }

        return cb(new Error("Only JPG, JPEG and PNG images are allowed"));

    }

    if (
        file.fieldname === "datasheet" ||
        file.fieldname === "quotation_pdf" ||
        file.fieldname === "pdf"
    ) {

        if (file.mimetype === "application/pdf") {
            return cb(null, true);
        }

        return cb(new Error("Only PDF files are allowed"));

    }

    cb(null, true);

};

const upload = multer({
    storage,
    fileFilter
});

module.exports = upload;