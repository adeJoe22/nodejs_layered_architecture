import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "joe-codelab",
  api_key: "393319871386378",
  api_secret: "F1KF32aMeFRUqO36vtunjzRefWo",
  secure: true,
});

const cloudUploader = cloudinary.uploader;

export const cloudAPI = cloudinary.api;

export default cloudUploader;
