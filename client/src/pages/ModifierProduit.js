import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UploadImage from "../components/UploadImage";
export default function ModifierProduit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    NomProduit: "",
    Prix: 0,
    Stock: 0,
    Description: "",
    Image: "",
    ID_Categorie: 1,
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
  const handleImage = (image) => {
    setFormData({ ...formData, ["Image"]: image });
  };
  const handleModifier = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
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

    if (typeof formData.Image === "object" && formData.Image) {
      data.append("image", formData.Image); // Only append if it's a file object
    }

    axios
      .put(`http://localhost:3000/products/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      }) // Adjust URL if needed
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
          <UploadImage
            onImageSelect={(file) => handleImage(file)}
            image={formData.Image} // Pass the current image for display
          />

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
