const cloudinary = require("../config/cloudinary");
const fs = require("fs");

const uploadServiceToCloudinary = async (file) => {

    if (!file) {
        return null;
    }

    try {

        const result = await cloudinary.uploader.upload(
            file.path,
            {
                folder: "amtec-technologies/services",
                resource_type: "image"
            }
        );

        // Delete temporary local file
        if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
        }

        return result.secure_url;

    } catch (error) {

        // Delete temporary file if upload fails
        if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
        }

        throw error;
    }
};

module.exports = uploadServiceToCloudinary;