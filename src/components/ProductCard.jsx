import React from "react";
import { Star } from "lucide-react";
import axios from "axios";
import { useState, useEffect } from "react";
import Star_Off from "../assets/Star_Off.svg";
import Star_On from "../assets/Star_On.svg";
function App() {
  const [products, setProducts] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.storefront.wdb.skooldio.dev/products"
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

  useEffect(() => {
    console.log("Product state updated:", products);
  }, [products]);

  return (
    <>
      <div className="w-[370px] h-[524px]">
        <div className="w-[370px] border border-gray-200">
          <div className="relative w-[370px] h-[370px]">
            <img
              src={products?.data[0].imageUrls[0]}
              alt="Woman wearing a light blue long-sleeved top"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="Product_Detail">
          <div>
            <h3 className="product-card-title">{products?.data[0].name}</h3>
          </div>
          <p className="product-card-description">
            {products?.data[0].description}
          </p>
          <div className="flex items-center mt-2 space-x-2">
            {[...Array(4)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current text-[#def81c] " />
            ))}
            {[...Array(1)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current text-[#e1e1e1]" />
            ))}
          </div>
          <div className="text-right ">
            <span className="text-xl font-bold text-gray-900  ">
              THB {products?.data[0].price}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
