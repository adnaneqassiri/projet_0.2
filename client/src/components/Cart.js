import { Modal } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../CartContext";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Cart({ show, handleClose }) {
  let cart = useContext(CartContext);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.log("Error fetching products:", error));
  }, []);
  function getTotalCost() {
    let totalCost = 0;
    cart.items.forEach((el) => {
      const productData = products.find((e) => {
        return e.ID_Produit === +el.id;
      });
      console.log(productData);
      totalCost += productData.Prix * el.quantity;
      console.log(productData.Prix, el.quantity);
    });

    return totalCost;
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cart.items.length !== 0 ? (
            <div className="cart-items">
              {cart.items.map((e) => {
                console.log(cart.items);
                console.log(products);
                let product = products.find(
                  (el) => +el.ID_Produit === parseInt(e.id)
                );
                console.log(product);
                return (
                  <div className="cart-item">
                    <div className="right">
                      <div className="section-1">
                        <img src={product.Image} alt="" />
                      </div>
                      <div className="section-2">
                        <h2>{product.NomProduit}</h2>
                        <div className="counter">
                          <span
                            onClick={() => {
                              cart.addOneToCart(e.id, 1);
                            }}
                          >
                            +
                          </span>
                          <p>{e.quantity}</p>
                          <span
                            onClick={() => {
                              cart.removeOneFromCart(e.id);
                            }}
                          >
                            -
                          </span>
                        </div>
                        <div className="remove-price">
                          <p className="price">
                            Unit : MAD {parseInt(product.Prix).toFixed(0)}
                          </p>
                          <div className="left price">
                            Total : MAD {(product.Prix * e.quantity).toFixed(0)}
                          </div>
                          <button onClick={() => cart.deleteFromCart(e.id)}>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <h1>Empty cart</h1>
          )}

          <div className="checkOut">
            <h3>
              TOTAL :
              <span className="price">MAD {getTotalCost().toFixed(2)}</span>
            </h3>
            {cart.items.length !== 0 ? (
              <Link to="/purchase" onClick={handleClose}>
                Purchase all items!
              </Link>
            ) : (
              <div></div>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
