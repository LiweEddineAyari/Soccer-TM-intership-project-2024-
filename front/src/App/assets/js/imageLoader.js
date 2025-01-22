// src/assets/js/imageLoader.js

const image = null; 

// Function to load an image dynamically
export const loadImage = async (path) => {
  if (!path) {
    try {
      // Dynamically import the image
       image = await import(`../images/${path}`);
    } catch (error) {
      console.error(`Error loading image at path: ${path}`, error);
      return null; // Return null or a fallback image if loading fails
    }
  }
  return image ; // Return the cached image
};
