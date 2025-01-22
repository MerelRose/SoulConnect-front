import React, { useState } from 'react';

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      {/* Carousel Images */}
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="object-cover w-full h-64"
        />
      </div>

      {/* Previous Button */}
      <button
        onClick={handlePrev}
        className="absolute p-2 text-white transform -translate-y-1/2 bg-gray-800 rounded-full shadow-md top-1/2 left-4 hover:bg-gray-700"
      >
        &larr;
      </button>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="absolute p-2 text-white transform -translate-y-1/2 bg-gray-800 rounded-full shadow-md top-1/2 right-4 hover:bg-gray-700"
      >
        &rarr;
      </button>

      {/* Dots Navigation */}
      <div className="flex justify-center mt-4 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-gray-800' : 'bg-gray-400'
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
