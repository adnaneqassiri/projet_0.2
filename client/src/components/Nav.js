import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faXmark,
  faUser,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, Link } from "react-router-dom";
import { useState, useContext } from "react";
import Cart from "./Cart";
import "bootstrap/dist/css/bootstrap.min.css";
import { CartContext } from "../CartContext";
import { UserContext } from "../UserContext";

export default function Nav() {
  const cart = useContext(CartContext);
  const user = useContext(UserContext);

  console.log(user.user);
  // Determine admin status directly from context
  const isAdmin = user.user?.ID_Role === 1; // Assuming 1 indicates admin
  const isLogged = user.isLoggedIn;

  const [show, setShow] = useState(false); // Toggle for mobile nav
  const [showCart, setShowCart] = useState(false); // Toggle for cart modal

  // Calculate total items in the cart
  const nItems = cart.items.reduce((total, item) => total + item.quantity, 0);

  // Toggle mobile menu visibility
  const toggleNav = () => setShow((prev) => !prev);

  // Close mobile menu
  const closeNav = () => setShow(false);

  return (
    <div className="nav">
      <div className="container">
        {/* Logo */}
        <div className="logo">
          <Link to="/">
            <span>Fioren</span>za.
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div
          className="links"
          style={show ? { right: "0px" } : { right: "-300px" }}
        >
          <ul>
            <li onClick={closeNav}>
              <NavLink to="/">Home</NavLink>
            </li>
            <li onClick={closeNav}>
              <NavLink to="/products">Products</NavLink>
            </li>
            {isAdmin && (
              <>
                <li onClick={closeNav}>
                  <NavLink to="/myProducts">My Products</NavLink>
                </li>
                <li onClick={closeNav}>
                  <NavLink to="/les_commandes">Les Commandes</NavLink>
                </li>
              </>
            )}
            <li onClick={closeNav}>
              <NavLink to="/contact">Contact</NavLink>
            </li>
            <li onClick={closeNav}>
              <NavLink to="/about">About Us</NavLink>
            </li>
            <li onClick={closeNav} className="auth">
              {isLogged ? (
                <NavLink to="/user" className={"logged-btn"}>
                  <FontAwesomeIcon icon={faUser} />
                  <p>{user?.user?.Prenom}</p>
                </NavLink>
              ) : (
                <NavLink to="/signin">SIGN IN</NavLink>
              )}
            </li>
            <li onClick={closeNav} className="cart-icon">
              <button onClick={() => setShowCart(true)}>
                <FontAwesomeIcon icon={faCartShopping} />
                {nItems > 0 && <span>({nItems})</span>}
              </button>
            </li>
          </ul>
        </div>

        {/* Mobile Navigation */}
        <div
          className="mobile"
          style={
            show
              ? { zIndex: 1, color: "#fff", fontSize: "20px" }
              : { zIndex: 1, color: "#000" }
          }
        >
          {/* Cart Button */}
          <button onClick={() => setShowCart(true)}>
            <FontAwesomeIcon icon={faCartShopping} />
            {nItems > 0 && <span>({nItems})</span>}
          </button>

          {/* Toggle Button */}
          <FontAwesomeIcon onClick={toggleNav} icon={show ? faXmark : faBars} />
        </div>

        {/* Cart Modal */}
        <Cart show={showCart} handleClose={() => setShowCart(false)} />
      </div>
    </div>
  );
}
