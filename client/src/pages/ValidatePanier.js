import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../CartContext";
import { UserContext } from "../UserContext";

function ValidatePanier() {
  const { items, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const [prixTotal, setPrixTotal] = useState(0);
  const [formData, setFormData] = useState({
    Prix_Total: 0,
    ID_Utilisateur: 0,
    Adresse_Livraison: "",
    Code_Postal: "",
  });

  useEffect(() => {
    // Redirect to /signin if user is not logged in
    if (!user?.isLoggedIn) {
      navigate("/signin", { state: { from: "/validateOrder" } });
    } else {
      // Set user ID when user context updates
      if (user?.user?.ID_Utilisateur) {
        setFormData((prev) => ({
          ...prev,
          ID_Utilisateur: user.user.ID_Utilisateur,
        }));
      }
    }
  }, [user, navigate]);

  useEffect(() => {
    // Calculate total price whenever cart items change
    axios
      .get("/products")
      .then((res) => {
        let totalCost = 0;
        items.forEach((el) => {
          const productData = res.data.find((e) => e.ID_Produit === +el.id);
          if (productData) {
            totalCost += parseInt(productData.Prix) * el.quantity;
          }
        });
        setPrixTotal(totalCost);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, [items]);

  useEffect(() => {
    // Update form data with prixTotal whenever it changes
    setFormData((prev) => ({ ...prev, Prix_Total: prixTotal }));
  }, [prixTotal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/commandes", formData)
      .then((res) => {
        console.log("sent to commandes");
        console.log(formData);
        console.log(res.data.insertId);
        if (res.data.insertId) {
          for (let i = 0; i < items.length; i++) {
            const data = {
              ID_Commande: res.data.insertId,
              ID_Produit: items[i].id,
              Quantite: items[i].quantity,
            };
            console.log(data);
            axios
              .post("http://localhost:3000/liste_produits", data)
              .then((res) => console.log(res.data))
              .catch((err) => console.log(err));
          }
          setFormData({
            Prix_Total: 0,
            ID_Utilisateur: 0,
            Adresse_Livraison: "",
            Code_Postal: "",
          });
          clearCart();
          alert("Order Submited.");
          navigate("/", { replace: true });
        }
      })
      .catch((err) => console.log(err));
    alert("Commande validée avec succès !");
  };

  return (
    <div className="validate-order">
      <div className="container">
        <h2>Validation de la Commande</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Mode de paiement</label>
            <input type="text" value="Cash on delivery" readOnly />
          </div>
          <div>
            <label htmlFor="adresseLivraison">Adresse de Livraison:</label>
            <input
              type="text"
              id="adresseLivraison"
              name="Adresse_Livraison"
              placeholder="Entrez votre adresse de livraison"
              value={formData.Adresse_Livraison}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="codePostale">Code Postale:</label>
            <input
              type="text"
              id="codePostale"
              name="Code_Postal"
              placeholder="Entrez votre code postale"
              value={formData.Code_Postal}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <button type="submit">Valider la Commande</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ValidatePanier;
