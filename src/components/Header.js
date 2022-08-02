import vinted from "../images/logo.png";
import { Link, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";

const Header = ({ token }) => {

  const [openModal, setOpenModal] = useState(false);
  console.log("token", token);
  return (
    <header>
      <nav className="container">
        <div className="header-contain">
          <Link to="/">
            <img src={vinted} alt="logo-vinted" />
          </Link>
          <div className="input-search">
            <input type="search" placeholder="Recherche des articles" />
          </div>

          {!token ? (
            <div className="btn-grp">
              <Link to="/signup" className="btn-left">
                <button>s'inscrire</button>
              </Link>
              <Link to="/login" className="btn-left">
                <button>se connecter</button>
              </Link>
              <Link to="/login" className="btn-grp sales-now">
                <button>vends maintenant</button>
              </Link>
            </div>
          ) : (
            <div className="btn-grp">
              <Link
                className="btn-left"
                to="/"
                onClick={() => {
                  Cookies.remove("token");
                  Navigate("/");
                }}
              >
                <button>se déconnecter</button>
              </Link>
              <Link to="/login" className="btn-grp sales-now">
                <button>vends maintenant</button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
