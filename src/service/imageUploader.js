class ImageUploader {
  async upload(file) {
    const data = new FormData();
    data.append("file", file);
    data.append("folder", "reBlogProject/images");
    data.append("upload_preset", `${process.env.REACT_APP_upload_preset}`);
    const result = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_url_id}/upload`,
      {
        method: "POST",
        body: data,
      }
    );
    return result.json();
  }

  async videoUpload(file) {
    const data = new FormData();
    data.append("file", file);
    data.append("folder", "reBlogProject/videos");
    data.append("upload_preset", "ltyevxil");
    const result = await fetch(
      "https://api.cloudinary.com/v1_1/dewa3t2gi/video/upload",
      {
        method: "POST",
        body: data,
      }
    );
    return result.json();
  }
}

export default ImageUploader;
