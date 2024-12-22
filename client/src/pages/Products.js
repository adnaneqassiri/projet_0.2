import React, { useState, useEffect } from "react";
import Products from "../components/Products";
import axios from "axios";

export default function ProductsPage() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    // Fetch categories from the server
    axios
      .get("http://localhost:3000/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="products-page">
      <div className="container">
        <h2>
          Découvrez dès aujourd'hui notre incroyable sélection de produits !
        </h2>

        {/* Category filter */}
        <div className="category-filter">
          <label htmlFor="category">Filtrer par catégorie: </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">Toutes les catégories</option>
            {categories.map((category) => (
              <option key={category.ID_Categorie} value={category.ID_Categorie}>
                {category.NomCategorie}
              </option>
            ))}
          </select>
        </div>

        {/* Pass selectedCategory as a prop to Products */}
        <Products category={selectedCategory} />
      </div>
    </div>
  );
}
