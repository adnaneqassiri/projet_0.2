import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UploadImage from "../components/UploadImage";

export default function Ajouter() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    NomProduit: "",
    Prix: 0,
    Stock: 0,
    Description: "",
    Image: "",
    ID_Categorie: 1,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleImage = (image) => {
    setFormData({ ...formData, ["Image"]: image });
  };
  const handleAjouter = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("NomProduit", formData.NomProduit);
    data.append("Prix", formData.Prix);
    data.append("Stock", formData.Stock);
    data.append("Description", formData.Description);
    if (formData.ID_Categorie == "classique") {
      data.append("ID_Categorie", 1);
    } else if (formData.ID_Categorie == "casual") {
      data.append("ID_Categorie", 2);
    } else {
      data.append("ID_Categorie", 3);
    }

    if (formData.Image) {
      data.append("image", formData.Image); // "image" matches multer fieldname
    }

    axios
      .post(`http://localhost:3000/products`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(data);
        navigate("/myProducts", { replace: true });
        alert("Product added successfully");
      })
      .catch((err) => {
        console.log([formData]);
        console.error("Error adding product:", err);
        alert("Failed to add product");
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
                maxLength={50}
                required
              />
            </div>
            <div className="three-ints">
              <input
                type="number"
                placeholder="Prix"
                name="Prix"
                value={formData.Prix}
                onChange={handleChange}
                required
              />
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
                name="ID_Categorie"
                value={formData.ID_Categorie}
                onChange={handleChange}
                required
              >
                <option value="classique">Classique</option>
                <option value="casual">Casual</option>
                <option value="sport">Sport</option>
              </select>
            </div>
            <UploadImage onImageSelect={handleImage} />
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
