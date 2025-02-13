// import React from "react";

// const getImageSource = (userPic) => {
//   if (!userPic) {
//     return "fallback-image-url"; // Fallback image
//   }
//   //console.log("image", userPic);

//   if (userPic.startsWith("/9j/") || userPic.startsWith("iVBOR")) {
//     return `data:image/jpeg;base64,${userPic}`;
//   }

//   const lowerCasePic = userPic.toLowerCase();
//   if (lowerCasePic.endsWith(".jpeg") || lowerCasePic.endsWith(".jpg")) {
//     return `data:image/jpeg;base64,${userPic}`;
//   }

//   if (lowerCasePic.endsWith(".png")) {
//     return `data:image/png;base64,${userPic}`;
//   }

//   console.warn("Unsupported file format:", userPic);
//   return "fallback-image-url";
// };

// export default getImageSource;

const getImageSource = (userPic) => {
  if (!userPic) {
    console.warn("No userPic provided. Using fallback image.");

    return "fallback-image-url"; // Fallback image
  }

  // Check for Base64 prefixes

  if (userPic.startsWith("/9j/") || userPic.startsWith("iVBOR")) {
    return `data:image/jpeg;base64,${userPic}`;
  }

  const lowerCasePic = userPic.toLowerCase();

  // Check for known image file extensions

  if (lowerCasePic.endsWith(".jpeg") || lowerCasePic.endsWith(".jpg")) {
    console.warn(
      "Detected a file extension, but userPic is expected to be a Base64 string."
    );

    return "fallback-image-url";
  }

  if (lowerCasePic.endsWith(".png")) {
    console.warn(
      "Detected a file extension, but userPic is expected to be a Base64 string."
    );

    return "fallback-image-url";
  }

  // Log unsupported file formats

  console.warn("Unsupported file format:", userPic);

  return "fallback-image-url";
};

export default getImageSource;
