import React, { useState } from "react";
import "../css/Header.css";
import { LuShoppingBasket } from "react-icons/lu";
import { FaMoon } from "react-icons/fa";
import { MdOutlineLightMode } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Badge from '@mui/material/Badge';
import { useSelector, useDispatch } from "react-redux"; // useDispatch'i yukarı taşıdım
import { setSearchTerm } from "../redux/slices/productSlice.jsx";

const Header = ({ onBasketClick }) => { 
  const [theme, setTheme] = useState(false);

  // Sepet ve ürün state'lerini çekme
  const { products } = useSelector((state) => state.basket);
  const productState = useSelector((state) => state.products) || {};
  const searchTerm = productState.searchTerm || ""; // Null/Undefined koruması
  
  const basketCount = products ? products.length : 0;
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  
  const handleSearch = (e) => {
      // Input değerini Redux'a gönder
      const value = e.target.value || "";
      dispatch(setSearchTerm(value)); 
  };
  
  const changeTheme = () => {
    const root = document.getElementById("root");
    if (!theme) {
      root.style.backgroundColor = "black";
      root.style.color = "#ffff";
    } else {
      root.style.backgroundColor = "#ffff";
      root.style.color = "black";
    }
    setTheme(!theme);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 0",
      }}
    >
      <div
        className="flex-row"
        onClick={() => navigate("/")} 
        style={{ cursor: "pointer" }}
      >
        <img className="logo" src="./src/images/logo.png" alt="Elenzo Logo"/>
        <p className="logoText">Elenzo</p>
      </div>

      <div className="flex-row">
        <input
          className="searchInput"
          type="text"
          placeholder="Bir şeyler arayın..."
          value={searchTerm}
          onChange={handleSearch}
        />

        <div className="header-icons">
          {theme ? 
            <FaMoon className="header-icons" onClick={changeTheme} />
            : 
            <MdOutlineLightMode
              className="header-icons"
              onClick={changeTheme}
            />
          } 
          
          <Badge 
            badgeContent={basketCount} 
            color="primary"
            onClick={onBasketClick} 
            style={{ cursor: 'pointer' }}
          >
            <LuShoppingBasket />
          </Badge>  
        </div>
      </div>  
    </div>
  );
};

export default Header;