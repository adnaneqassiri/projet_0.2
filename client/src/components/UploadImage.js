import React, { useEffect, useState } from "react";

function UploadImage({ onImageSelect, image }) {
  const [imagePreview, setImagePreview] = useState(image); // State to store the preview URL
  const [imageName, setImageName] = useState(""); // State to store the image name
  useEffect(() => {
    if (image) {
      setImagePreview(image); // Set the initial image preview from the prop
      // setImageName(image); // Extract and set the image name from the URL
    }
  }, [image]);
  console.log(imagePreview);
  const handleImageChange = (e) => {
    const image = e.target.files[0];
    if (image) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result); // Set preview URL
        setImageName(image.name); // Set image name
      };
      reader.readAsDataURL(image);

      onImageSelect(image); // Pass the image file to the parent component
    }
  };

  return (
    <div className="upload-image">
      <input
        type="file"
        id="file"
        accept="image/*"
        onChange={handleImageChange}
        hidden
      />
      <div
        className={`img-area ${imagePreview ? "active" : ""}`}
        onClick={() => document.getElementById("file").click()}
      >
        {imageName && <p className="image-name">{imageName}</p>}
        {imagePreview ? (
          <img src={imagePreview} alt="Preview" />
        ) : (
          <>
            <i className="bx bxs-cloud-upload icon"></i>
            <h3>Upload Image</h3>
            <p>Click to choose an image</p>
          </>
        )}
      </div>
    </div>
  );
}

export default UploadImage;
