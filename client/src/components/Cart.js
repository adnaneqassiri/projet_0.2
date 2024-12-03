import { Modal } from "react-bootstrap";
import { useContext } from "react";
import { CartContext } from "../CartContext";
import { products } from "../products";
import { Link } from "react-router-dom";

export default function Cart({ show, handleClose }) {
  let cart = useContext(CartContext);

  function getTotalCost() {
    let totalCost = 0;
    cart.items.forEach((el) => {
      const productData = products.find((e) => {
        return e.id === +el.id;
      });
      totalCost += productData.price * el.quantity;
      console.log(productData.price, el.quantity);
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
                let product = products.find((el) => el.id === +e.id);
                return (
                  <div className="cart-item">
                    <div className="right">
                      <div className="section-1">
                        <img src={product.image} alt="" />
                      </div>
                      <div className="section-2">
                        <h2>{product.title}</h2>
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
                          <p className="price">Unit : ${product.price}</p>
                          <div className="left price">
                            Total : ${(product.price * e.quantity).toFixed(2)}
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
              Total :<span className="price">${getTotalCost().toFixed(2)}</span>
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
