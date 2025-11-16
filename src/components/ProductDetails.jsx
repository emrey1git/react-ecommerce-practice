import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setSelectedProduct } from "../redux/slices/productSlice.jsx";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosRemoveCircleOutline } from "react-icons/io";

import '../App.css';
import { BiFontFamily } from "react-icons/bi";

function ProductDetails() {
  const { id } = useParams();
  const { products, selectedProduct } = useSelector((state) => state.products);
  const { title, image, price, description } = selectedProduct;
  const dispatch = useDispatch();

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
    <div  style={{ marginTop: "30px", display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
      <div style={{marginRight: '50px'}}>
        <img src={image} alt="" width={300} height={500} />
      </div>
      <div>
        <h1 style={{fontFamily:'arial'}}>{title}</h1>
        <p style={{fontFamily:'arial'}}>{description}</p>
        <h1 style={{fontFamily:'arial', fontSize: '50px' ,fontWeight: 'bold',color: 'red'}}>{price}₺</h1>
        <div style={{display:'flex',alignItems:'center'}}>
        <IoIosAddCircleOutline style={{fontSize: '40px', cursor:'pointer'}  }/> <span style={{fontSize:'25px'}}>0</span> <IoIosRemoveCircleOutline style={{fontSize: '40px', cursor:'pointer'}}/> 
       
        </div>
         <button style={{marginTop:'10px'}}>Sepete Ekle</button>
      </div>
    </div>
  );
}

export default ProductDetails;
