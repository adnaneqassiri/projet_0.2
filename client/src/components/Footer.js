import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTwitter,
  faLinkedinIn,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import logo from "../imgs/fiexx56.png";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="logo">
          <img style={{ borderRadius: "50%" }} src={logo} alt="" />
        </div>
        <div className="catalogue">
          <h3>Links</h3>
          <ul>
            <li>
              <Link to="privacy">Privacy</Link>
            </li>
            <li>
              <Link to="payment">Payment</Link>
            </li>
            <li>
              <Link to="policies">Policies</Link>
            </li>
            <li>
              <Link to="manuel">Manuel</Link>
            </li>
          </ul>
        </div>
        <div className="shop">
          <h3>Links</h3>
          <ul>
            <li>
              <Link to="signin">Login</Link>
            </li>
            <li>
              <Link to="delivery">Delivery</Link>
            </li>
            <li>
              <Link to="newCollection">Payement methods</Link>
            </li>
            <li>
              <Link to="faq">FAQ</Link>
            </li>
          </ul>
        </div>
        <div className="contact">
          <h3>Contact</h3>
          <ul>
            <li>
              <Link to="">Telephone : +212 00000000</Link>
            </li>
            <li>
              <Link to="">Email : contact@fiexx56.com</Link>
            </li>
            <li>
              <div className="icons">
                <div>
                  <Link to="https://www.instagram.com/adnane_qassiri/?hl=en">
                    <FontAwesomeIcon icon={faInstagram} />
                  </Link>
                  <Link to="https://github.com/adnaneqassiri">
                    <FontAwesomeIcon icon={faGithub} />
                  </Link>
                </div>
                <div>
                  <Link to="https://ma.linkedin.com/in/adnane-qassiri-7294491b5">
                    <FontAwesomeIcon icon={faLinkedinIn} />
                  </Link>
                  <Link to="https://www.facebook.com/adnan.kasiri.7/">
                    <FontAwesomeIcon icon={faTwitter} />
                  </Link>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
