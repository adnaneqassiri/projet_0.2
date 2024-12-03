import React, { useRef, useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { products } from "../products";

export default function Home() {
  const contentRef = useRef(null);
  const [index, setIndex] = useState(1);
  const [data] = useState(products);

  const slides = useMemo(
    () => [
      {
        url: "https://img.freepik.com/free-photo/full-shot-woman-sitting-chair_23-2149220652.jpg?size=626&ext=jpg",
      },
      {
        url: "https://img.freepik.com/free-photo/studio-shot-pretty-black-woman-with-white-shopping-bag-standing-yellow-background-trendy-spring-fashionable-look_273443-10.jpg?size=626&ext=jpg",
      },
      {
        url: "https://img.freepik.com/free-photo/black-friday-elements-assortment_23-2149074075.jpg?w=740&t=st=1687381750~exp=1687382350~hmac=f7458a06f5d43a95721b779e96d623fde04d7e6ebe8d615dd31776f0637f3f61",
      },
      {
        url: "https://img.freepik.com/free-photo/full-shot-man-running-with-shopping-bags_23-2149220643.jpg?w=740&t=st=1687107075~exp=1687107675~hmac=470f990a8d9f0527fb652acc3f4c70db9e09a370772e40962e3c0afdd5a66204",
      },
      {
        url: "https://img.freepik.com/free-photo/full-shot-people-with-sale-tags_23-2149220653.jpg?w=740&t=st=1687381801~exp=1687382401~hmac=afa9dc06876435fde07a8cf8074c955f40765f1cbd84d72186b54918deea178a",
      },
      {
        url: "https://img.freepik.com/free-photo/close-up-woman-holding-shopping-bags_23-2149220711.jpg?w=740&t=st=1687381846~exp=1687382446~hmac=c2bc3b29fd7e8ddbac049f6968ae5991f9f4976be7d6e83d5630b64377865190",
      },
      {
        url: "https://img.freepik.com/free-photo/close-up-hand-holding-paper-bag_23-2149220671.jpg?w=740&t=st=1687381900~exp=1687382500~hmac=83684a733598ad0279bdd4915891886bc993b0b79abec2b655c9a7e45e4d004a",
      },
    ],
    []
  );
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
          Discover, <span>Shop</span>, Enjoy - Your <span>Premier</span> Online
          Store Experience<span>!</span>
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
            {data
              .filter(
                (el) =>
                  el.category === "men's clothing" ||
                  el.category === "women's clothing"
              )
              .map((el) => {
                return (
                  <Link to={`/products/${el.id}`} key={el.id}>
                    <div className="car-d">
                      <img src={el.image} alt="" />
                      <h2>{el.title}</h2>
                      <p>${el.price}</p>
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
