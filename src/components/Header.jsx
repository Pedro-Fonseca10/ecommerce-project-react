import { useState } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

export function Header({ cart = [] }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  const [searchText, setSearchText] = useState(`${search ? search : ""}`);
  const totalQuantity = Array.isArray(cart)
    ? cart.reduce((sum, cartItem) => sum + (cartItem?.quantity ?? 0), 0)
    : 0;

  return (
    <>
      <div className="header">
        <div className="left-section">
          <Link to="/" className="header-link">
            <img className="logo" src="images/logo-white.png" />
            <img className="mobile-logo" src="images/mobile-logo-white.png" />
          </Link>
        </div>

        <div className="middle-section">
          <input
            className="search-bar"
            type="text"
            placeholder="Search"
            onChange={(event) => {
              setSearchText(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                navigate(`/?search=${searchText}`);
              }
            }}
          />

          <button
            className="search-button"
            onClick={() => {
              navigate(`/?search=${searchText}`);
            }}
          >
            <img className="search-icon" src="images/icons/search-icon.png" />
          </button>
        </div>

        <div className="right-section">
          <Link className="orders-link header-link" to="/orders">
            <span className="orders-text">Orders</span>
          </Link>

          <Link className="cart-link header-link" to="/checkout">
            <img className="cart-icon" src="images/icons/cart-icon.png" />
            <div className="cart-quantity">{totalQuantity}</div>
            <div className="cart-text">Cart</div>
          </Link>
        </div>
      </div>
    </>
  );
}
