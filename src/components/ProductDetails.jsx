import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setSelectedProduct } from "../redux/slices/productSlice.jsx";

function ProductDetails() {
  const { id } = useParams();
  const { products, selectedProduct } = useSelector((state) => state.products);
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
    <div>
      {selectedProduct && selectedProduct.title ? (
        <div>
          <h3>{selectedProduct.title}</h3>
          <p>{selectedProduct.price} ₺</p>
          <p>{selectedProduct.description}</p>
        </div>
      ) : (
        <p>Ürün detayları yükleniyor...</p>
      )}
    </div>
  );
}

export default ProductDetails;
