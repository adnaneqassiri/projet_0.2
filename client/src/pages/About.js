import React from "react";
import logoEnsa from "../imgs/logo-ensa.png";
export default function About() {
  return (
    <div className="about-us">
      <div
        style={{ display: "flex", flexDirection: "column" }}
        className="container"
      >
        <h1>À propos de nous</h1>
        <p>
          Ce site web a été réalisé dans le cadre d'un projet du module
          <span> "Fondamentaux des bases de données"</span>, en première année
          du cycle ingénieur, filière <span>BDIA</span>, à l'ENSA de Tétouan. Il
          a été développé par <span>Adnane Qassiri</span>,
          <span> Said Jadli</span> et <span>Yasser Nadi</span>.
        </p>
        <img
          style={{ width: "250px", margin: "10px auto" }}
          src={logoEnsa}
          alt=""
        />
      </div>
    </div>
  );
}
