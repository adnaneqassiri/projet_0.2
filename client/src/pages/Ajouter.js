import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Ajouter() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    NomProduit: "",
    Prix: "",
    Stock: "",
    Description: "",
    Categorie: "electronics",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleAjouter = (e) => {
    e.preventDefault();
    axios
      .post(`/products`, formData)
      .then((res) => {
        console.log(res.data);
        navigate("/myProducts");
        alert("product added");
      })
      .catch((err) => {
        alert("product not added");
      });
  };
  return (
    <div className="ajouter-produit">
      <div className="container">
        <div className="container">
          <h2>Ajouter</h2>
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
            <div>
              <input type="file" accept="image/*" id="imageInput"></input>
            </div>
            <div className="buttons">
              <button onClick={(e) => handleAjouter(e)} type="submit">
                Ajouter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
