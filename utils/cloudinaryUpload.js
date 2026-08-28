const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

function uploadToCloudinary(file, folder, resourceType = "auto") {

    return new Promise((resolve, reject) => {

        if (!file) return resolve(null);

        const stream = cloudinary.uploader.upload_stream(
            {
                folder: folder,
                resource_type: resourceType
            },
            (error, result) => {

                if (error) {
                    return reject(error);
                }

                resolve({
                    url: result.secure_url,
                    public_id: result.public_id,
                    resource_type: result.resource_type
                });
            }
        );

        streamifier
            .createReadStream(file.buffer)
            .pipe(stream);

    });

}
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

module.exports = cloudinary;

module.exports = uploadToCloudinary;