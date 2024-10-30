import React, { useState } from "react";

const ProductDetail = ({ product }) => {
  if (!product) return null;

  const { id, name, price, promotionalPrice, imageUrls, variants } = product;
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const uniqueColors = Array.from(
    new Set(variants.map((variant) => variant.color))
  );
  const uniqueSizes = Array.from(
    new Set(variants.map((variant) => variant.size))
  ).sort(
    (a, b) =>
      ["XS", "S", "M", "L", "XL"].indexOf(a) -
      ["XS", "S", "M", "L", "XL"].indexOf(b)
  );

  const colorCodes = uniqueColors.reduce((acc, color) => {
    const variant = variants.find((variant) => variant.color === color);
    if (variant) acc[color] = variant.colorCode;
    return acc;
  }, {});

  const handleColorSelect = (color) => setSelectedColor(color);
  const handleSizeSelect = (size) => setSelectedSize(size);

  const getAvailableQuantity = () => {
    const selectedVariant = variants.find(
      (variant) =>
        variant.color === selectedColor && variant.size === selectedSize
    );
    return selectedVariant ? selectedVariant.remains : 0;
  };

  const availableQuantity = getAvailableQuantity();

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert("Please select both color and size.");
      return;
    }
    setIsModalOpen(true); // Open the modal when the item is added to the cart
    document.body.style.overflow = "hidden"; // Disable page scrolling
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto"; // Re-enable page scrolling
  };

  return (
    <div className="w-[780px] h-[auto]">
      <div className="flex flex-col pt-6">
        <div className="font-semibold text-lg">Available Colors:</div>
        <div className="flex space-x-4 pt-4">
          {uniqueColors.map((color) => (
            <div
              key={color}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => handleColorSelect(color)}
            >
              <div
                style={{
                  width: "54px",
                  height: "54px",
                  display: "grid",
                  gridTemplateColumns: "repeat(5, 1fr)",
                  gridTemplateRows: "repeat(5, 1fr)",
                  gap: "2px",
                  border:
                    selectedColor === color
                      ? "3px solid #FFD700"
                      : "1px solid #ddd",
                  boxShadow:
                    selectedColor === color
                      ? "0 0 5px rgba(0,0,0,0.5)"
                      : "none",
                }}
              >
                {[...Array(25)].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      backgroundColor: colorCodes[color],
                      width: "100%",
                      height: "100%",
                    }}
                  ></div>
                ))}
              </div>
              <span
                style={{
                  marginTop: "8px",
                  fontSize: "14px",
                  color: "#333",
                  fontWeight: selectedColor === color ? "bold" : "normal",
                }}
              >
                {color}
              </span>
            </div>
          ))}
        </div>

        <div className="font-semibold text-lg pt-6">Available Sizes:</div>
        <div className="flex space-x-2 pt-2">
          {uniqueSizes.map((size) => (
            <button
              key={size}
              style={{
                backgroundColor: selectedSize === size ? "#007BFF" : "#4A90E2",
                color: "#fff",
                padding: "10px 15px",
                borderRadius: "5px",
                border: selectedSize === size ? "2px solid #000" : "none",
                boxShadow:
                  selectedSize === size ? "0 0 5px rgba(0,0,0,0.5)" : "none",
              }}
              onClick={() => handleSizeSelect(size)}
            >
              {size}
            </button>
          ))}
        </div>

        <div className="pt-6">
          <div className="font-semibold text-lg">Quantity:</div>
          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="mt-2 border border-gray-300 rounded p-2"
            disabled={!selectedColor || !selectedSize}
          >
            {[...Array(availableQuantity).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>

      {/* Modal for Cart Summary */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.7)", // Darker backdrop
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              width: "852px",
              backgroundColor: "#fff",
              borderRadius: "8px",
              overflow: "hidden",
              textAlign: "center",
              position: "relative",
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 20px",
                fontSize: "20px",
                fontWeight: "bold",
                borderBottom: "1px solid #e5e5e5",
                height: "40px",
              }}
            >
              <span>Items added to your cart</span>
              <button
                onClick={handleCloseModal}
                style={{
                  background: "transparent",
                  border: "none",
                  fontSize: "24px",
                  cursor: "pointer",
                }}
              >
                &times;
              </button>
            </div>

            {/* Product Summary */}
            <div
              style={{
                display: "flex",
                padding: "20px",
                alignItems: "center",
              }}
            >
              <img
                src={imageUrls[0]}
                alt={name}
                style={{ width: "80px", height: "80px", marginRight: "20px" }}
              />
              <div style={{ flex: 1, textAlign: "left" }}>
                <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>{name}</h3>
                <p style={{ fontSize: "14px", color: "#555" }}>
                  QTY: {quantity}
                </p>
              </div>
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  marginLeft: "auto",
                }}
              >
                THB {(promotionalPrice || price).toLocaleString()}.00
              </p>
            </div>

            {/* Action Buttons */}
            <div
              style={{
                display: "flex",
                borderTop: "1px solid #e5e5e5",
                height: "60px",
              }}
            >
              <button
                style={{
                  flex: 1,
                  padding: "10px",
                  backgroundColor: "#333",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
                onClick={handleCloseModal}
              >
                View Cart
              </button>
              <button
                style={{
                  flex: 1,
                  padding: "10px",
                  backgroundColor: "#f0f0f0",
                  color: "#333",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
                onClick={handleCloseModal}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
