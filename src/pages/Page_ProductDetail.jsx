import React, { useState, useEffect } from "react";
import Image_Slideshow from "../components/Image_SlideShow";
import ProductDetail from "../components/ProductDetail";
import ProductCustomization from "../components/ProductCustomization";
// fetch router
import axios from "axios";

function App() {
  const [products, setProducts] = useState();
  const [ID, setID] = useState("dBt7jOQ9qnKvs8aWrxb5"); // Change this to the correct product ID

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.storefront.wdb.skooldio.dev/products/shirts-the-winter-rebel-parka"
        );
        return response.data;
      } catch (error) {
        console.log("ERROR", error);
      }
    };

    fetchData().then((res) => {
      setProducts(res);
    });
  }, []);

  useEffect(() => {}, [products]);

  // Find the product based on the ID

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div style={{ flex: "1", marginRight: "20px" }}>
          <div className="w-[780px] h-[983.21px]">
            <Image_Slideshow product={products} />{" "}
            {/* Pass images to slideshow */}
          </div>
        </div>
        <div style={{ flex: "1" }}>
          <ProductDetail product={products} />{" "}
          {/* Pass selected product to ProductDetail */}
          <ProductCustomization product={products} />{" "}
          {/* Pass selected product to ProductCustomization */}
        </div>
      </div>
    </div>
  );
}

export default App;
