import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";

const ProductCard = ({ product }) => {
  const options = {
    value: product.ratings || 0,  // Ensure ratings always have a value
    readOnly: true,
    precision: 0.5,
  };

  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img
        src={product.images?.[0]?.url || "/placeholder.jpg"} // ✅ Prevent error
        alt={product.name || "Product"}
      />
      <p>{product.name}</p>
      <div>
        <Rating {...options} />
        <span className="productCardSpan"> ({product.numOfReviews} Reviews)</span>
      </div>
      <span>{`₹${product.price}`}</span>
    </Link>
  );
};

export default ProductCard;
