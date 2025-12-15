import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// Gerekli import'lar
import { setSelectedProduct } from "../redux/slices/productSlice.jsx";
import { addToBasket } from "../redux/slices/basketSlice.jsx";
// ---

import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosRemoveCircleOutline } from "react-icons/io";

import "../App.css";


function ProductDetails() {
  const { id } = useParams();
  const { products, selectedProduct } = useSelector((state) => state.products);
  

  const { 
      title = "", 
      image = "", 
      price = 0, 
      description = "" 
  } = selectedProduct || {}; 
  
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();

  const increment = () => {
    setCount(count + 1);
  };
  
  const decrement = () => {
   
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const addBasket = () => {
    const payload = {
     
      id: parseInt(id), 
      price,
      image,
      title,
      description,
      quantity: count 
    }; 
    
    if (count > 0) {
        dispatch(addToBasket(payload));
        alert(`${title} ürününden ${count} adet sepete eklendi.`);
    } else {
        alert("Sepete eklemek için en az 1 adet seçmelisiniz.");
    }
  };

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
            color: "rgba(185, 76, 76)",
          }}
        >
          {price}₺
        </h1>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IoIosAddCircleOutline
            onClick={increment}
            style={{ fontSize: "40px", marginRight: "15px", cursor: "pointer" }}
          />{" "}
          <span style={{ fontSize: "35px" }}> {count} </span>{" "}
          <IoIosRemoveCircleOutline
            onClick={decrement}
            style={{ fontSize: "40px", marginLeft: "15px", cursor: "pointer" }}
          />
        </div>
        <button
          onClick={addBasket}
          style={{
            marginTop: "10px",
            border: "none",
            padding: "10px",
            background: "rgba(185, 76, 76)",
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