import "./App.css";
import PageContainer from "./container/pageContainer";
import Header from "./components/Header";
import RouterConfig from "./config/RouterConfig.jsx";
import Loading from "./components/Loading.jsx";
import Drawer from "@mui/material/Drawer";
import { useSelector } from "react-redux";
import React, { useState } from "react";

function App() {
  const { products } = useSelector((state) => state.basket);

  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const basketClose = () => {
    setIsBasketOpen(false);
  };
  const basketOpen = () => {
    setIsBasketOpen(true);
  };

  // Sepetin Genel Toplamını Hesaplama
  const totalPrice = products.reduce((acc, product) => {
    const quantity = product.quantity || product.count || 1;
    return acc + (product.price * quantity);
  }, 0);


  return (
    <>
      <PageContainer>
        {/* basketOpen fonksiyonu Header'a prop olarak gönderiliyor */}
        <Header onBasketClick={basketOpen} />
        <RouterConfig />
        <Loading />
        
        <Drawer anchor="right" open={isBasketOpen} onClose={basketClose}>
          {/* Genişlik ve Padding */}
          <div style={{ width: "350px", padding: "15px" }}>
            
            {/* Başlık ve Kapatma Butonu */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #ccc",
                paddingBottom: "10px",
                marginBottom: "10px",
              }}
            >
              <h3>Sepetim ({products.length})</h3>
              <button
                onClick={basketClose}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1.2em",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                X
              </button>
            </div>
            
            {/* Ürün Listesi */}
            {products.length === 0 ? (
              <p>Sepetinizde ürün bulunmamaktadır.</p>
            ) : (
              products.filter(product => product && product.title && product.price > 0).map((product, index) => {
                return (
                  <div
                    key={product.id || index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px",
                      borderBottom: "1px dotted #eee",
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      width={50}
                      height={50}
                      style={{ flexShrink: 0 }}
                    />
                    {/* Ürün Adı ve Miktar */}
                    <p style={{ flexGrow: 1, margin: 0, width: "120px" }}>
                      {product.title} (x{product.quantity || product.count || 1})
                    </p>
                    {/* Ürünün Toplam Fiyatı */}
                    <p style={{ margin: 0, fontWeight: "bold", width: "80px" }}>
                      {(product.price * (product.quantity || product.count || 1)).toFixed(2)}₺
                    </p>
                    
                    {/* Sil Butonu */}
                    <button
                      // Silme fonksiyonunu buraya bağlamanız gerekir
                      style={{
                        marginRight: "5px",
                        borderRadius: "5px",
                        backgroundColor: "rgba(185, 76, 76)",
                        border: "none",
                        color: "#fff",
                        width: "50px",
                        padding: '5px'
                      }}
                    >
                      Sil
                    </button>
                  </div>
                );
              })
            )}
            
            {/* Genel Toplam Satırı */}
            {products.length > 0 && (
                <div style={{ marginTop: '20px', paddingTop: '10px', borderTop: '2px solid #333', textAlign: 'right', fontWeight: 'bold', fontSize: '1.2em' }}>
                    Genel Toplam: {totalPrice.toFixed(2)}₺
                </div>
            )}

          </div>
        </Drawer>
      </PageContainer>
    </>
  );
}

export default App;