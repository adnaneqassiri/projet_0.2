import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

function Login() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayedText, setDisplayedText] = useState("");
  const userContext = useContext(UserContext); // Use UserContext here
  const navigate = useNavigate();
  const location = useLocation();
  const user = useContext(UserContext);
  const [entredData, setEntredData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    console.log(user?.isLoggedIn);
    if (user?.isLoggedIn) {
      navigate("/products", { replace: true });
    }
  }, [user, navigate]);

  // Fetch users from the server
  useEffect(() => {
    axios
      .get("http://localhost:3000/utilisateur")
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEntredData({ ...entredData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const signedUser = users.filter((user) => user.Email === entredData.email);

    if (
      signedUser.length === 0 ||
      signedUser[0].MotDePasse !== entredData.password
    ) {
      setDisplayedText(
        "Invalid Email or Password. If you don't have an account, sign up."
      );
      alert(
        "Invalid Email or Password. If you don't have an account, sign up."
      );
    } else {
      setDisplayedText("Login succeeded!");
      userContext.login(signedUser[0]); // Update UserContext
      setEntredData({ email: "", password: "" }); // Clear form
      const from = location.state?.from || "/";
      navigate(from, { replace: true });
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="login">
      <div className="container">
        <h1>
          Have an account? If not, <Link to="/signup">Sign Up</Link>
        </h1>
        <form onSubmit={handleSubmit}>
          <h1 style={{ color: "#fff" }}>Login</h1>
          <p style={{ color: "white", transition: "1s ease" }}>
            {displayedText}
          </p>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={entredData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={entredData.password}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
