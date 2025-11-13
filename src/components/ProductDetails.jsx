import React, { useEffect } from "react";
import { useSelector } from "react-redux";

function ProductDetails() {
  const { id } = useParams();
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    getProductById;
  }, [id]);

  const getProductById = () => {
    const product = products.find((product) => product.id === parseInt(id));
    console.log(product);
  }
  return <div>ProductDetails</div>;
}

export default ProductDetails;
