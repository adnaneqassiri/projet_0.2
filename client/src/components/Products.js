import { products } from "../products";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Products() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <>
      <div className="products">
        <div className="cards">
          {data.map((el) => {
            return (
              <Link to={`/products/${el.ID_Produit}`} key={el.ID_Produit}>
                <div className="car-d">
                  {/* <img src={el.image} alt="" /> */}
                  <h2>{el.NomProduit}</h2>
                  <p>${el.Prix}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
