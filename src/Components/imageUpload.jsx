import { useEffect, useState } from "react";
// import { CLOUDINARY_CLOUD_NAME } from "../Configs/RequestMethod";
import { CLOUDINARY_CLOUD_NAME } from "../Configs/API";

const ImageUpload = ({ onImageUpload }) => {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "insta-PCS"); // Replace with your actual upload preset name
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`, // Replace with your Cloudinary details
          {
            method: "POST",
            body: data,
          }
        );
        const result = await response.json();
        console.log("clouuidnary ------", result);

        if (result.secure_url) {
          onImageUpload(result.secure_url);
        } else {
          console.error("Image upload failed");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false); // Set loading state to false once the upload is complete
      }
    }
  };

  useEffect(() => {
    if (!image) {
      setImage(null);
    }
  }, [image]);

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {isLoading && <p>Loading...</p>}
      {image && (
        <img
          src={URL.createObjectURL(image)}
          alt="Uploaded"
          className="h-[12rem]"
        />
      )}
    </div>
  );
};

export default ImageUpload;
