import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function MyProducts() {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const [dataUpdated, setDataUpdated] = useState(1);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  // Redirect if user role is not admin
  useEffect(() => {
    if (user?.user?.ID_Role === 2) {
      navigate("/products", { replace: true });
    }
  }, [user, navigate]);

  // Fetch products
  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((res) => {
        setProducts(res.data);
        setError(""); // Clear any previous error
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load products. Please try again.");
      });
  }, [dataUpdated]);

  // Delete a single product
  const handleSupprimer = (e, id) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:3000/products/${id}`)
      .then(() => {
        setDataUpdated((prev) => prev + 1); // Trigger re-fetch
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        alert("Failed to delete product.");
      });
  };

  // Delete all products
  const handleDeleteAll = () => {
    axios
      .delete("http://localhost:3000/products")
      .then(() => {
        setDataUpdated((prev) => prev + 1);
      })
      .catch((error) => {
        console.error("Error deleting all products:", error);
        alert("Failed to delete all products.");
      });
  };

  return (
    <div className="myproducts">
      <div className="container">
        <h1>My Products</h1>
        {error && <p className="error-message">{error}</p>}
        <table>
          <thead>
            <tr>
              <th>ID_Produit</th>
              <th>NomProduit</th>
              <th>
                <NavLink to="/myProducts/ajouter" className="ajouter">
                  Ajouter
                </NavLink>
              </th>
              <th>
                <button onClick={handleDeleteAll} className="del-all">
                  Del All
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((el) => {
              const {
                ID_Produit,
                NomProduit,
                Prix,
                Stock,
                Description,
                Categorie,
              } = el;
              return (
                <tr key={ID_Produit}>
                  <td>{ID_Produit}</td>
                  <td>{NomProduit}</td>
                  <td>
                    <NavLink to={`/myProducts/${ID_Produit}`}>Modifier</NavLink>
                  </td>
                  <td>
                    <button
                      onClick={(e) => handleSupprimer(e, ID_Produit)}
                      className="del"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
