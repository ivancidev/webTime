import React, { useState } from "react";
import ButtonIcon from "../../../components/buttons/buttonIcon";
import Camera from "../../../icons/camera";
import Delete from "../../../icons/delete";
import UserReg from "../../../icons/userRegister";

const ImageUploader = () => {
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleImageDelete = () => {
    setImage(null);
  };

  const fileInputRef = React.useRef(null);

  const handleCameraClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex flex-row">
      <div className="ml-10">
        {image ? (
          <img
            src={image}
            alt="Selected"
            className="w-32 h-32 object-cover mb-2 rounded-full"
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
  );
};

export default ImageUploader;
