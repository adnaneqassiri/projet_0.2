import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
export default function MyProducts() {
  const navigate = useNavigate();
  const [dataUpdated, setdataUpdated] = useState(1);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((res) => {
        setProducts(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [dataUpdated]);

  const handleSupprimer = (e, id) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:3000/products/${id}`)
      .then((response) => {
        console.log(response.data);
        navigate("/myProducts");
        setdataUpdated((p) => p + 1);
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        alert("Failed to delete product.");
      });
  };
  return (
    <div className="myproducts">
      <div className="container">
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
                <button className="del-all">del all</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((el) => {
              console.log(el);
              const {
                ID_Produit,
                NomProduit,
                Prix,
                Stock,
                Description,
                Categorie,
              } = el;
              return (
                <tr>
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
