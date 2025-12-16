  import "./App.css";
  import PageContainer from "./container/pageContainer";
  import Header from "./components/Header";
  import RouterConfig from "./config/RouterConfig.jsx";
  import Loading from "./components/Loading.jsx";
  import Drawer from "@mui/material/Drawer";
  import { useSelector } from "react-redux";
  import React, { useState } from "react";
  import { useDispatch } from "react-redux";
  import { removeFromBasket } from "./redux/slices/basketSlice.jsx";

  function App() {
    const { products } = useSelector((state) => state.basket);

    const [isBasketOpen, setIsBasketOpen] = useState(false);
    const basketClose = () => {
      setIsBasketOpen(false);
    };
    const basketOpen = () => {
      setIsBasketOpen(true);
    };
    const dispatch = useDispatch();
    const deleteItemFromBasket = (productId) => {
      dispatch(removeFromBasket(productId)); 
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
            <div 
             className="basket-drawer-container">
              
              {/* Başlık ve Kapatma Butonu */}
              <div className="basket-header"
              
              >
                <h3>Sepetim ({products.length})</h3>
                <button className="basket-close-btn"
                  onClick={basketClose}
                  
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
                    <div className="basket-item"
                      key={product.id || index}
                      
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        width={50}
                        height={50}
                        style={{ flexShrink: 0 }}
                      />
                      {/* Ürün Adı ve Miktar */}
                      <p className="item-title">
                        {product.title} (x{product.quantity || product.count || 1})
                      </p>
                      {/* Ürünün Toplam Fiyatı */}
                      <p className="item-price" >
                        {(product.price * (product.quantity || product.count || 1)).toFixed(2)}₺
                      </p>
                      
                      {/* Sil Butonu */}
                      <button className="delete-btn"
                        onClick={()=> deleteItemFromBasket(product.id)}
                     
                      >
                        Sil
                      </button>
                    </div>
                  );
                })
              )}
              
              {/* Genel Toplam Satırı */}
              {products.length > 0 && (
                  <div className="basket-total" >
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