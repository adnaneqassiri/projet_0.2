import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../CartContext";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Purchase() {
  let cart = useContext(CartContext);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    // Define an async function inside the useEffect
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products");
        setProducts(response.data);
        console.log("Data fetched and added");
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };
    // Call the async function
    fetchProducts();
  }, []);

  // Make sure products are loaded before calculating total cost
  function getTotalCost() {
    if (products.length === 0) {
      return 0; // Return 0 if products are still loading
    }
    let totalCost = 0;
    cart.items.forEach((el) => {
      const productData = products.find((e) => e.ID_Produit === +el.id);
      if (productData) {
        totalCost += productData.Prix * el.quantity;
      }
    });

    return totalCost;
  }

  // Check if products are loaded before rendering cart
  if (products.length === 0) {
    return <div>Loading products...</div>; // You can show a loading message or spinner here
  }

  return (
    <>
      {cart.items.length !== 0 ? (
        <div className="purchase">
          <div className="container">
            <div className="comp-1">
              <div className="cart-items">
                {cart.items.map((e) => {
                  let product = products.find(
                    (el) => el.ID_Produit === parseInt(e.id)
                  );
                  if (!product) return null; // Handle case if product is not found
                  return (
                    <div className="cart-item" key={e.id}>
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
                          <div className="price">
                            <span>Unité : </span> MAD {product.Prix}
                          </div>
                          <div className="left price">
                            <span> Total : </span>MAD{" "}
                            {(product.Prix * e.quantity).toFixed(2)}
                          </div>
                          <button onClick={() => cart.deleteFromCart(e.id)}>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="checkOut">
                <h3>
                  TOTAL :{" "}
                  <span className="price">MAD {getTotalCost().toFixed(2)}</span>
                </h3>
                <Link to={"/validateOrder"}>Validé le panier</Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container" style={{ marginTop: "100px" }}>
          <h3>Put something in the cart first!</h3>
        </div>
      )}
    </>
  );
}
