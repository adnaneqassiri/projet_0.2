import React, { useRef, useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
export default function Home() {
  const contentRef = useRef(null);
  const [index, setIndex] = useState(1);

  const slides = useMemo(
    () => [
      {
        url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        url: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        url: "https://images.unsplash.com/photo-1561715276-a2d087060f1d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        url: "https://images.unsplash.com/photo-1523194258983-4ef0203f0c47?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
    []
  );
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
  useEffect(() => {
    const handleSwitch = () => {
      setIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    };
    const interval = setInterval(handleSwitch, 6000);

    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.backgroundImage = `url(${slides[index].url})`;
    }
  }, [index, slides]);

  const handleLeftClick = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const handleRightClick = () => {
    setIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="home">
      <div className="container">
        <h2>
          Découvrez, <span>Achetez</span>, Profitez - <span>Votre</span>{" "}
          Expérience d&apos;<span>Achat</span> en Ligne d&apos;Exception !
        </h2>
        <div ref={contentRef} className="content">
          <FontAwesomeIcon
            onClick={handleLeftClick}
            icon={faAngleLeft}
            className="left"
          />
          <FontAwesomeIcon
            onClick={handleRightClick}
            icon={faAngleRight}
            className="right"
          />
        </div>
        <div className="popular-collection">
          <h2 className="">Popular Collection</h2>
          <div className="cards">
            {data.map((el) => {
              return (
                <Link to={`/products/${el.ID_Produit}`} key={el.ID_Produit}>
                  <div className="car-d">
                    <img src={el.Image} alt="" />
                    <h2>{el.NomProduit}</h2>
                    <p style={{ fontWeight: 500 }}>MAD {el.Prix}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
