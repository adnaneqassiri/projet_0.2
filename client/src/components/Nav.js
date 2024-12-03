import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faXmark,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, Link } from "react-router-dom";
import { useState, useContext } from "react";
import Cart from "./Cart";
import "bootstrap/dist/css/bootstrap.min.css";
import { CartContext } from "../CartContext";

export default function Nav() {
  const cart = useContext(CartContext);
  const nItems = cart.items.reduce((pV, cV, id) => {
    return pV + cV.quantity;
  }, 0);
  console.log(nItems);
  const [show, setShow] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const handleShowCart = () => {
    setShowCart(true);
  };
  const handleClose = () => setShowCart(false);
  function handleClick() {
    setShow((pValue) => !pValue);
  }
  function handleCloseNav() {
    setShow(false);
  }
  return (
    <div className="nav">
      <div className="container">
        <div className="logo">
          <Link to="https://adnaneqassiri.com">
            <span>FIEXX</span>56.
          </Link>
        </div>
        <div
          className="links"
          style={show ? { right: "0px" } : { right: "-300px" }}
        >
          <ul>
            <li onClick={handleCloseNav}>
              <NavLink to="/">Home</NavLink>
            </li>
            <li onClick={handleCloseNav}>
              <NavLink to="products">Products</NavLink>
            </li>
            <li onClick={handleCloseNav}>
              <NavLink to="myProducts">My Products</NavLink>
            </li>
            <li onClick={handleCloseNav}>
              <NavLink to="contact">Contact</NavLink>
            </li>
            <li onClick={handleCloseNav}>
              <NavLink to="about">About us</NavLink>
            </li>
            <li onClick={handleCloseNav} className="cart-icon">
              <button onClick={handleShowCart}>
                {nItems ? (
                  <div>
                    <FontAwesomeIcon icon={faCartShopping} />
                    <p>Cart ({nItems} items)</p>
                  </div>
                ) : (
                  <div>
                    <FontAwesomeIcon icon={faCartShopping} />
                    <p>Cart</p>
                  </div>
                )}
              </button>
            </li>
          </ul>
        </div>

        <div
          className="mobile"
          style={
            show
              ? { zIndex: 1, color: "#fff", fontSize: "20px" }
              : { zIndex: 1, color: "#000" }
          }
        >
          <button onClick={handleShowCart}>
            {nItems ? (
              <div>
                <FontAwesomeIcon icon={faCartShopping} />
                <p>Cart ({nItems} items)</p>
              </div>
            ) : (
              <div>
                <FontAwesomeIcon icon={faCartShopping} />
                <p>Cart</p>
              </div>
            )}
          </button>
          {show ? (
            <FontAwesomeIcon onClick={handleClick} icon={faXmark} />
          ) : (
            <FontAwesomeIcon onClick={handleClick} icon={faBars} />
          )}
        </div>
        <Cart show={showCart} handleClose={handleClose} />
      </div>
    </div>
  );
}
