import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const SimpleSlideshow = ({ product }) => {
  if (!product) return null; // Return null if no product data is available
  const [activeIndex, setActiveIndex] = useState(0);
  const { price, promotionalPrice, imageUrls } = product;

  console.log("Price:", price, "Promotional Price:", promotionalPrice); // Check values in console

  const images = imageUrls.map((url, index) => ({
    src: url,
    alt: `Slide ${index + 1}`,
  }));

  const handleThumbnailClick = (index) => {
    setActiveIndex(index); // Update active index when a thumbnail is clicked
  };

  // Calculate discount percentage
  const discountPercentage = Math.round(
    ((price - promotionalPrice) / price) * 100
  );

  console.log("Discount Percentage:", discountPercentage); // Check discount percentage in console

  return (
    <div style={{ position: "relative", textAlign: "center" }}>
      {/* Display discount label if the promotional price is less than the regular price */}
      {promotionalPrice < price && discountPercentage > 0 && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            backgroundColor: "red",
            color: "white",
            padding: "5px 10px",
            borderRadius: "4px",
            fontWeight: "bold",
            zIndex: 10, // Ensure it appears on top
          }}
        >
          -{discountPercentage}%
        </div>
      )}

      <Swiper
        style={{ width: "780px", height: "780px" }}
        loop={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)} // Update active index on slide change
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image.src}
              alt={image.alt}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {images
          .filter((_, index) => index !== activeIndex) // Filter out the currently active image
          .map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={image.alt}
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                cursor: "pointer",
                margin: "0 5px",
                border:
                  images.findIndex((img) => img.src === image.src) ===
                  activeIndex
                    ? "2px solid blue"
                    : "none", // Highlight selected thumbnail
              }}
              onClick={() =>
                handleThumbnailClick(
                  images.findIndex((img) => img.src === image.src)
                )
              } // Change active image on thumbnail click
            />
          ))}
      </div>
    </div>
  );
};

export default SimpleSlideshow;
