const { cloudinary } = require("../config/Cloudinary");

exports.uploadImageToCloudinary = async (
    file,
    folder,
    height,
    quality,
    resourceType = "auto"
) => {
    if (!file?.tempFilePath) {
        throw new Error("Uploaded file is missing or invalid");
    }

    const options = {
        folder,
        resource_type: resourceType,
    };

    if (height) options.height = height;
    if (quality) options.quality = quality;

    return cloudinary.uploader.upload(file.tempFilePath, options);
};
