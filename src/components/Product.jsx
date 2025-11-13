import React, { use } from "react";
import "../css/Product.css";
import "../App.css";
function Product({ product }) {
  const { id, title, image, price, description } = product;
  const navigate = useNavigate();
 
  return (
    <div>
      <div className="card">
        <img className="image" src={image} alt={title} />
        <p style={{ textAlign: "center", height: "80px" }}>{title}</p>
        <h3 style={{ textAlign: "center" }}>{price} ₺</h3>
        <div className="flex-row">
          <button className="detail-button" onClick={()=>navigate("/product-details/" + id)}>Detay</button>
        </div>
      </div>
    </div>
  );
}

export default Product;
