import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as XLSX from "xlsx";

function User() {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const [{ Nom, Prenom, Email, Telephone, MotDePasse }, setUserData] = useState(
    user?.user
  );

  const [commandes, setCommandes] = useState([]);
  const [listeProduit, setListeProduit] = useState([]);
  const [produits, setProduits] = useState([]);
  const [utilisateurs, setUtilisateurs] = useState([]);

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [commandesRes, produitsRes, listeProduitRes, utilisateursRes] =
          await Promise.all([
            axios.get("http://localhost:3000/commande"),
            axios.get("http://localhost:3000/products"),
            axios.get("http://localhost:3000/liste_produits"),
            axios.get("http://localhost:3000/utilisateur"),
          ]);

        setCommandes(commandesRes.data);
        setProduits(produitsRes.data);
        setListeProduit(listeProduitRes.data);
        setUtilisateurs(utilisateursRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Export function for "Historique des commandes"
  const handleExportHistoriqueCommandes = () => {
    const historiqueCommandes = commandes.map((commande) => {
      const {
        ID_Commande,
        Prix_Total,
        ID_Utilisateur,
        Adresse_Livraison,
        Code_Postal,
        Date_Commande,
      } = commande;

      // Find user details
      const utilisateur = utilisateurs.find(
        (user) => user.ID_Utilisateur === ID_Utilisateur
      );

      // Find products for the order
      const relatedProducts = listeProduit
        .filter((lp) => lp.ID_Commande === ID_Commande)
        .map((lp) => {
          const product = produits.find((p) => p.ID_Produit === lp.ID_Produit);
          return product
            ? `${product.NomProduit} (${product.Prix} MAD) x ${lp.Quantite}`
            : "Produit introuvable";
        });

      const produitsCommandes = relatedProducts.join("; ");

      return {
        ID_Commande,
        Prix_Total: `${Prix_Total} MAD`,
        Nom: utilisateur?.Nom || "N/A",
        Prénom: utilisateur?.Prenom || "N/A",
        Email: utilisateur?.Email || "N/A",
        Téléphone: utilisateur?.Telephone || "N/A",
        Adresse_Livraison: Adresse_Livraison || "N/A",
        Code_Postal: Code_Postal || "N/A",
        Date_Commande: Date_Commande || "N/A",
        Produits_Commandés: produitsCommandes,
      };
    });

    // Create Excel workbook
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(historiqueCommandes);

    // Add headers to Excel file
    XLSX.utils.sheet_add_aoa(
      worksheet,
      [
        [
          "ID Commande",
          "Prix Total",
          "Nom",
          "Prénom",
          "Email",
          "Téléphone",
          "Adresse Livraison",
          "Code Postal",
          "Date Commande",
          "Produits Commandés",
        ],
      ],
      { origin: "A1" }
    );

    // Append and save file
    XLSX.utils.book_append_sheet(workbook, worksheet, "Historique_Commandes");
    XLSX.writeFile(workbook, "Historique_Commandes.xlsx");
  };

  return (
    <div className="user-page">
      <div className="container">
        <h3>Welcome {Prenom}, Your information is below</h3>
        <ul>
          <li>Nom : {Nom}</li>
          <li>Prénom : {Prenom}</li>
          <li>Email : {Email}</li>
          <li>Téléphone : {Telephone}</li>
          <li>Mot De Passe : {MotDePasse}</li>
        </ul>
        <button onClick={handleExportHistoriqueCommandes}>
          Historique des commandes
        </button>
        <button
          onClick={(e) => {
            user.logout();
            navigate("/", { replace: true });
          }}
          className="logout-btn"
        >
          LOGOUT
        </button>
      </div>
    </div>
  );
}

export default User;
