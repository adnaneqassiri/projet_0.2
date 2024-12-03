import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faInstagram,
    faTwitter,
    faLinkedinIn,
    faGithub,
} from "@fortawesome/free-brands-svg-icons";
import logo from "../imgs/logo-3-1.png";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <div className="footer">
            <div className="container">
                <div className="logo">
                    <img src={logo} alt="" />
                </div>
                <div className="catalogue">
                    <h3>Catalogue</h3>
                    <ul>
                        <li>
                            <Link to="accessories">Accessories</Link>
                        </li>
                        <li>
                            <Link to="sale">Sale</Link>
                        </li>
                        <li>
                            <Link to="payment">Payment</Link>
                        </li>
                        <li>
                            <Link to="woman">FAQ</Link>
                        </li>
                        <li>
                            <Link to="men">Man</Link>
                        </li>
                    </ul>
                </div>
                <div className="shop">
                    <h3>Shop</h3>
                    <ul>
                        <li>
                            <Link to="about">About</Link>
                        </li>
                        <li>
                            <Link to="delivery">Delivery</Link>
                        </li>
                        <li>
                            <Link to="newCollection">New Collection</Link>
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
                            <Link to="">+212 642434828</Link>
                        </li>
                        <li>
                            <Link to="">shop@gmail.com</Link>
                        </li>
                        <li>
                            <div className="icons">
                                <Link to="https://www.instagram.com/adnane_qassiri/?hl=en">
                                    <FontAwesomeIcon icon={faInstagram} />
                                </Link>
                                <Link to="https://github.com/adnaneqassiri">
                                    <FontAwesomeIcon icon={faGithub} />
                                </Link>
                                <Link to="https://ma.linkedin.com/in/adnane-qassiri-7294491b5">
                                    <FontAwesomeIcon icon={faLinkedinIn} />
                                </Link>
                                <Link to="https://www.facebook.com/adnan.kasiri.7/">
                                    <FontAwesomeIcon icon={faTwitter} />
                                </Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
