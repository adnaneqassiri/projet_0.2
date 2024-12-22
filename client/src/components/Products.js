import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Products({ category }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    if (category) {
      setFilteredData(
        data.filter((product) => product.ID_Categorie === parseInt(category))
      );
    } else {
      setFilteredData(data);
    }
  }, [category, data]);

  return (
    <>
      <div className="products">
        <div className="cards">
          {filteredData.map((el) => {
            return (
              <Link to={`/products/${el.ID_Produit}`} key={el.ID_Produit}>
                <div className="car-d">
                  <img src={el.Image} alt={el.NomProduit} />
                  <h2>{el.NomProduit}</h2>
                  <p style={{ fontWeight: 500 }}>MAD {el.Prix}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
