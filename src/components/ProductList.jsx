import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/slices/productSlice";

function ProductList() {
  // ✅ DOĞRU KONUM: Bileşen gövdesinin en üst seviyesi
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products); // <-- BURAYA TAŞINDI!

  // useEffect içinde sadece dispatch işlemini yapıyoruz
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]); // Bağımlılık dizisine 'dispatch' eklenmesi iyi bir pratik

  // Yükleniyor durumunu kontrol edebilirsiniz
  if (loading) {
    return <div>Ürünler Yükleniyor...</div>;
  }

  return (
    <div>
      <h2>Ürün Listesi ({products.length} adet)</h2>
      {/* products verisini burada kullanabilirsiniz */}
    </div>
  );
}

export default ProductList;
