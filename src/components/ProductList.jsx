import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/slices/productSlice.jsx";
import Product from "./Product.jsx";

function ProductList() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  console.log(products);
  // useEffect içinde sadece dispatch işlemini yapıyoruz
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]); // Bağımlılık dizisine 'dispatch' eklenmesi iyi bir pratik

  return (
    <div className="flex-row" style={{flexWrap:'wrap', marginTop: '25px'}}>
      {products &&
        products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
    </div>
  );
}

export default ProductList;
