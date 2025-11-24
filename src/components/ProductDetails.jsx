import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setSelectedProduct } from "../redux/slices/productSlice.jsx";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosRemoveCircleOutline } from "react-icons/io";

import "../App.css";
import { BiFontFamily } from "react-icons/bi";

function ProductDetails() {
  const { id } = useParams();
  const { products, selectedProduct } = useSelector((state) => state.products);
  const { title, image, price, description } = selectedProduct;
    const [ count, setCount ] = useState(0);

  const dispatch = useDispatch();

  const increment = () => {
    setCount(count + 1);
  }
  const decrement  = () => {
    if (count > 0) {
    setCount(count - 1);
  }
  }

  const getProductById = () => {
    if (products && products.length > 0) {
      const foundProduct = products.find(
        (product) => product.id === parseInt(id)
      );

      if (foundProduct) {
        dispatch(setSelectedProduct(foundProduct));
      }
    }
  };

  useEffect(() => {
    getProductById();
  }, [id, products, dispatch]);

  return (
    <div
      style={{
        marginTop: "30px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <div style={{ marginRight: "50px" }}>
        <img src={image} alt="" width={300} height={500} />
      </div>
      <div>
        <h1 style={{ fontFamily: "arial" }}>{title}</h1>
        <p style={{ fontFamily: "arial" }}>{description}</p>
        <h1
          style={{
            fontFamily: "arial",
            fontSize: "50px",
            fontWeight: "bold",
            color: "rgba(153, 100, 100, 1)",
          }}
        >
          {price}₺
        </h1>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IoIosAddCircleOutline onClick={increment}
            style={{ fontSize: "40px",marginRight: "15px",  cursor: "pointer" }}
          />{" "}
          <span style={{ fontSize: "35px" }}> {count} </span>{" "}
          <IoIosRemoveCircleOutline onClick={decrement}
            style={{ fontSize: "40px",marginLeft: "15px", cursor: "pointer" }}
          />
        </div>
        <button
          style={{
            marginTop: "10px",
            border: "none",
            padding: "10px",
            background: "rgba(153, 100, 100, 1)",
            color: "#fff",
            borderRadius: "5px",
          }}
        >
          Sepete Ekle
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;
