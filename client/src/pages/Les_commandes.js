import * as XLSX from "xlsx";
import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

function Les_commandes() {
  const navigate = useNavigate();
  const user = useContext(UserContext);

  const [commandes, setCommandes] = useState([]);
  const [listeProduit, setListeProduit] = useState([]);
  const [produits, setProduits] = useState([]);
  const [utilisateurs, setUtilisateurs] = useState([]); // New state for utilisateurs

  // Redirect if user role is not admin
  useEffect(() => {
    if (user?.user?.ID_Role === 2) {
      navigate("/products", { replace: true });
    }
  }, [user, navigate]);

  // Fetch all data when component mounts
  useEffect(() => {
    axios
      .get("http://localhost:3000/commande")
      .then((res) => setCommandes(res.data))
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:3000/products")
      .then((res) => setProduits(res.data))
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:3000/liste_produits")
      .then((res) => setListeProduit(res.data))
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:3000/utilisateur") // Fetch utilisateurs data
      .then((res) => setUtilisateurs(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Export function
  const handleOnExport = () => {
    // Combine commandes and their corresponding products and user info
    const combinedData = commandes.map((commande) => {
      const {
        ID_Commande,
        Prix_Total,
        ID_Utilisateur,
        Adresse_Livraison,
        Code_Postal,
      } = commande;

      // Find associated user
      const utilisateur = utilisateurs.find(
        (user) => user.ID_Utilisateur === ID_Utilisateur
      );

      // Find associated products
      const relatedProducts = listeProduit
        .filter((lp) => lp.ID_Commande === ID_Commande)
        .map((lp) => {
          const product = produits.find((p) => p.ID_Produit === lp.ID_Produit);
          return product
            ? `${product.NomProduit} - ${product.Prix} MAD`
            : "Produit introuvable";
        });

      const produitsCommandes = relatedProducts.join(", ");

      // Return the full data row
      return {
        ID_Commande,
        Prix_Total,
        Nom: utilisateur?.Nom || "N/A",
        Prenom: utilisateur?.Prenom || "N/A",
        Email: utilisateur?.Email || "N/A",
        Telephone: utilisateur?.Telephone || "N/A",
        Adresse_Livraison,
        Code_Postal,
        Produits_Commandes: produitsCommandes,
      };
    });

    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(combinedData);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Commandes_Utilisateurs");
    XLSX.writeFile(workbook, "Commandes_Utilisateurs.xlsx");
  };

  return (
    <div className="les-commandes">
      <div className="container">
        <table>
          <thead>
            <tr>
              <th>ID_Commande</th>
              <th>Prix_Total</th>
              <th>Produits</th>
              <th>Prenom</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Telephone</th>
            </tr>
          </thead>
          <tbody>
            {commandes.map((el) => {
              const { ID_Commande, Prix_Total, ID_Utilisateur } = el;

              // Find the associated user
              const utilisateur = utilisateurs.find(
                (user) => user.ID_Utilisateur === ID_Utilisateur
              );

              return (
                <tr key={ID_Commande}>
                  <td>{ID_Commande}</td>
                  <td>{Prix_Total}</td>
                  <td>
                    <ul>
                      {listeProduit
                        .filter((lp) => lp.ID_Commande === ID_Commande)
                        .map((lp) => {
                          const product = produits.find(
                            (p) => p.ID_Produit === lp.ID_Produit
                          );
                          return (
                            <li key={lp.ID_Produit}>
                              {product
                                ? `${product.NomProduit} - ${product.Prix} MAD`
                                : "Produit introuvable"}
                            </li>
                          );
                        })}
                    </ul>
                  </td>
                  <td>{utilisateur?.Prenom || "N/A"}</td>
                  <td>{utilisateur?.Nom || "N/A"}</td>
                  <td>{utilisateur?.Email || "N/A"}</td>
                  <td>{utilisateur?.Telephone || "N/A"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button onClick={handleOnExport}>EXPORT LES COMMANDES</button>
      </div>
    </div>
  );
}

export default Les_commandes;
