import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ModifierProduit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    NomProduit: "",
    Prix: "",
    Stock: "",
    Description: "",
    Categorie: "electronics",
  });
  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${id}`)
      .then((res) => {
        setFormData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleModifier = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    axios
      .put(`http://localhost:3000/products/${id}`, formData) // Adjust URL if needed
      .then((res) => {
        navigate("/myProducts", { replace: true });
        alert("Product updated successfully!"); // Updated success message
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to update product."); // Updated error message
      });
  };

  const handleSupprimer = (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:3000/products/${id}`)
      .then((response) => {
        console.log(response.data);
        navigate("/myProducts", { replace: true }); // Redirect to the desired route
        alert("Product deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        alert("Failed to delete product.");
      });
  };

  return (
    <div className="modifier-produit">
      <div className="container">
        <h2>Modifier</h2>
        <form>
          <div>
            <input
              type="text"
              placeholder="NomProduit"
              name="NomProduit"
              value={formData.NomProduit}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Prix"
              name="Prix"
              value={formData.Prix}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="number"
              name="Stock"
              placeholder="Stock"
              value={formData.Stock}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <textarea
              name="Description"
              placeholder="Description"
              value={formData.Description}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Catégorie:</label>
            <select
              name="Categorie"
              value={formData.Categorie}
              onChange={handleChange}
              required
            >
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="furniture">Furniture</option>
              <option value="beauty">Beauty</option>
              <option value="sports">Sports</option>
            </select>
          </div>
          <div className="buttons">
            <button onClick={(e) => handleModifier(e)} type="submit">
              Sauvgarder
            </button>
            <button onClick={(e) => handleSupprimer(e)} type="submit">
              Supprimer Produit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
