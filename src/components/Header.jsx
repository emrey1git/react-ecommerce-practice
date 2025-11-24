import React, { use, useState } from "react";
import "../css/Header.css";
import { LuShoppingBasket } from "react-icons/lu";
import { FaMoon } from "react-icons/fa";
import { MdOutlineLightMode } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [theme, setTheme] = useState(false);
  const navvigate = useNavigate();
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
        onClick={() => navvigate("/")}
        style={{ cursor: "pointer" }}
      >
        <img className="logo" src="./src/images/logo.png" />
        <p className="logoText">Elenzo</p>
      </div>

      <div className="flex-row">
        <input
          className="searchInput"
          type="text"
          placeholder="Bir şeyler arayın..."
        />

        <div className="header-icons">
          {theme ? (
            <FaMoon className="header-icons" onClick={changeTheme} />
          ) : (
            <MdOutlineLightMode
              className="header-icons"
              onClick={changeTheme}
            />
          )}

          <LuShoppingBasket />
        </div>
      </div>
    </div>
  );
};

export default Header;
