
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

                resolve(result);
            }
        );

        streamifier.createReadStream(file.buffer).pipe(stream);

    });

}

module.exports = uploadToCloudinary;