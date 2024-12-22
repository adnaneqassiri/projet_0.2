import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

function SignUp() {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    Nom: "",
    Prenom: "",
    Telephone: "",
    Email: "",
    MotDePasse: "",
    ID_Role: 2,
  });
  useEffect(() => {
    console.log(user?.isLoggedIn);
    if (user?.isLoggedIn) {
      navigate("/products", { replace: true });
    }
  }, [user, navigate]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleSubmitUser = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/utilisateur", userData)
      .then((res) => {
        console.log(res.data);

        user.login({ ...userData, ID_Utilisateur: res.data.insertId });
        user.isLoggedIn = true;
        navigate("/products", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        alert("User not added");
      });
  };
  return (
    <div className="login">
      <div className="container">
        <h1>
          Have an account? if yes <Link to="/signin">Sign in</Link>
        </h1>
        <form action="">
          <h1 style={{ color: "#fff" }}>Sign Up</h1>
          <input
            type="text"
            placeholder="Nom"
            name="Nom"
            value={userData.Nom}
            onChange={(e) => handleInputChange(e)}
            required
          />
          <input
            type="text"
            placeholder="Prenom"
            name="Prenom"
            value={userData.Prenom}
            onChange={(e) => handleInputChange(e)}
            required
          />
          <input
            type="text"
            placeholder="Telephone"
            name="Telephone"
            value={userData.Telephone}
            onChange={(e) => handleInputChange(e)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            name="Email"
            value={userData.Email}
            onChange={(e) => handleInputChange(e)}
            required
          />
          <input
            type="text"
            placeholder="MotDePasse"
            name="MotDePasse"
            value={userData.MotDePasse}
            onChange={(e) => handleInputChange(e)}
            required
          />
          <button onClick={(e) => handleSubmitUser(e)}>Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
