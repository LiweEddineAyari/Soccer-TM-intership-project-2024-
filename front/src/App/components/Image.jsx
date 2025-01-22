import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Image = ({ imageSource }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const importedImage = await import(`../assets/images/${imageSource}`);
        setImage(importedImage.default);
      } catch (err) {
        console.error("Error loading image:", err);
      }
    };

    loadImage();
  }, [imageSource]); // Include imageSource in dependency array



  return (
    image ? <img src={image} alt="imagee"  /> : null
  );
};

Image.propTypes = {
  imageSource: PropTypes.string.isRequired,
};

export default Image;
