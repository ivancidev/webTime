import React, { useState, useRef } from "react";
import ButtonIcon from "../../../components/buttons/buttonIcon";
import Camera from "../../../icons/camera";
import Delete from "../../../icons/delete";
import UserReg from "../../../icons/userRegister";

const ImageUploader = ({ onImageSelect }) => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;
      const fileExtension = file.name.split(".").pop().toLowerCase();

      if (
        !(
          (fileType === "image/png" && fileExtension === "png") ||
          (fileType === "image/jpeg" && fileExtension === "jpg")
        )
      ) {
        setError("Solo se permiten archivos PNG o JPG (no JPEG).");
        return;
      }

      setError(null);
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      onImageSelect(file);
    }
  };

  const handleImageDelete = () => {
    setImage(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCameraClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row">
        <div className="ml-10">
          {image ? (
            <img
              src={image}
              alt="Selected"
              className="w-32 h-32 object-cover rounded-full"
            />
          ) : (
            <UserReg />
          )}
        </div>
        <div className="flex flex-col justify-around ml-2 py-2">
          <ButtonIcon SvgIcon={Camera} onClick={handleCameraClick} />

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />

          <ButtonIcon SvgIcon={Delete} onClick={handleImageDelete} />
        </div>
      </div>
      {error && <span className="text-error-err2">{error}</span>}
    </div>
  );
};

export default ImageUploader;
