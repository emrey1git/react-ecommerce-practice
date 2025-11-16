import React, { use } from "react";
import "../css/Product.css";
import "../App.css";
import { useNavigate } from "react-router-dom";
function Product({ product }) {
  const { id, title, image, price, description } = product;
  const navigate = useNavigate();
 
  return (
    <div>
      <div className="card">
        <img className="image" src={image} alt="" />
        <div>
         <p style={{ textAlign: "center", height: "50px" }}>{title}</p>
        <h3 style={{ textAlign: "center" }}>{price} ₺</h3>
        </div>
       
        <div className="flex-row">
          <button className="detail-button" onClick={()=>navigate("/product-details/" + id)}>Detay</button>
        </div>
      </div>
    </div>
  );
}

export default Product;
