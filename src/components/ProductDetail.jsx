import React from "react";
import heart from "../assets/heart.svg";
import Star_Off from "../assets/Star_Off.svg";
import Star_On from "../assets/Star_On.svg";

const ProductDetail = ({ product }) => {
  if (!product) return null; // Return null if no product data is available

  const { id, name, description, price, promotionalPrice, ratings } = product;
  const filledStars = Math.floor(ratings);
  const totalStars = 5;
  return (
    <div className="w-[780px] h-[auto]">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-semibold text-gray-800 text-ellipsis text-left">
          ID {id}
        </div>
        <img src={heart} alt="heart Icon" />
      </div>

      <div className="text-5xl font-semibold text-gray-800 text-ellipsis text-left pt-4">
        {name}
      </div>
      <div className="text-2xl font-semibold text-gray-600 text-ellipsis text-left pt-4">
        {description}
      </div>

      {/* Display pricing based on promotional price */}
      <div className="pt-6">
        {promotionalPrice < price ? ( // Check if promotional price is less than the regular price
          <>
            <span className="text-[40px] font-semibold text-red-500">
              THB {promotionalPrice.toLocaleString()}.00
            </span>
            <span className="text-[20px] font-semibold text-gray-600 line-through pl-4">
              THB {price.toLocaleString()}.00
            </span>
          </>
        ) : (
          <div className="text-[40px] font-semibold text-gray-800 text-ellipsis text-left">
            THB {price.toLocaleString()}.00
          </div>
        )}
      </div>

      <div className="flex items-center mt-2">
        {[...Array(totalStars)].map((_, i) => (
          <img
            key={i}
            src={i < filledStars ? Star_On : Star_Off}
            alt={i < filledStars ? "Filled Star" : "Empty Star"}
            className="w-10 h-10"
            style={{
              marginRight: i < totalStars - 1 ? "8px" : "0px", // Consistent spacing between stars
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductDetail;
