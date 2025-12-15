import React, { useState } from "react";
import "../css/Header.css";
import { LuShoppingBasket } from "react-icons/lu";
import { FaMoon } from "react-icons/fa";
import { MdOutlineLightMode } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Badge from '@mui/material/Badge';
import { useSelector } from "react-redux";


// 1. Prop olarak onBasketClick'i (veya App.jsx'te kullandığınız ismi) alın.
const Header = ({ onBasketClick }) => { 
  const [theme, setTheme] = useState(false);

  const { products } = useSelector((state) => state.basket);
  const basketCount = products ? products.length : 0;

  // 2. navigate yazım hatasını düzeltin.
  const navigate = useNavigate(); 
  
  // Eski hali: const navvigate = useNavigate(); 
  // Eski hali: onClick={() => navvigate("/")}

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
        // Düzeltilmiş navigate kullanıldı
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
          
          {/* 3. Badge'e onClick event'i eklenip prop olarak gelen fonksiyon bağlandı. */}
          <Badge 
            badgeContent={basketCount} 
            color="primary"
            onClick={onBasketClick} // <<< KRİTİK DÜZELTME BURADA
            style={{ cursor: 'pointer' }} // Tıklanabilir olduğunu belli etmek için
          >
            <LuShoppingBasket />
          </Badge>  
        </div>
      </div>  
    </div>
  );
};

export default Header;