const cloudinary = require("../config/cloudinary");
const fs = require("fs");

const uploadToCloudinary = async (file, folder, resourceType = "auto") => {
    if (!file) {
        return null;
    }

    try {
        const result = await cloudinary.uploader.upload(
            file.path,
            {
                folder,
                resource_type: resourceType
            }
        );

        // Delete the temporary local file after successful upload
        fs.unlinkSync(file.path);

        return result.secure_url;

    } catch (error) {

        // Delete temporary file even if upload fails
        if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
        }

        throw error;
    }
};

module.exports = uploadToCloudinary;