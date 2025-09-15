const cloudinary = require("../utils/cloudinary");
const { v4: uuidv4 } = require("uuid");

async function uploadImage(file, category = "general") {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(new Error("No file uploaded"));
    }

    cloudinary.uploader.upload(
      file.path,
      {
        folder: category,   
        public_id: uuidv4(),
        resource_type: "image",
      },
      (err, result) => {
        if (err) return reject(err);
        resolve(result.secure_url);
      }
    );
  });
}

module.exports = { uploadImage };
