import vinted from "../images/logo.png";
import { Link, Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import PriceRange from "./PriceRange";

const Header = ({
  token,
  setToken,
  setTitle,
  priceMin,
  priceMax,
  setPriceMin,
  setPriceMax,
  page,
  setPage,
  limit,
  setLimit,
  sortPrice,
  setSortPrice,
  fetchRangeValues,
  setFetchRangeValues,
}) => {
  const location = useLocation();

  return (
    <>
      <header>
        <nav className="container">
          <div className="header-contain">
            <Link to="/">
              <img src={vinted} alt="logo-vinted" />
            </Link>
            <div className="input-search">
              <input
                type="search"
                placeholder="Recherche des articles"
                onChange={(event) => setTitle(event.target.value)}
              />
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
                    setToken(null);
                    Cookies.remove("token");
                    Navigate("/login");
                  }}
                >
                  <button>se déconnecter</button>
                </Link>
                <Link to="/publish" className="btn-grp sales-now">
                  <button>vends maintenant</button>
                </Link>
              </div>
            )}
          </div>
        </nav>

        {location.pathname === "/" ? (
          <div className="slider container">
            <div className="checked">
              <span>Trier par prix : </span>
              <input
                type="checkbox"
                checked={sortPrice}
                onChange={() => {}}
                name="price"
              />
              <div
                className="wrapper"
                onClick={() => {
                  setSortPrice(!sortPrice);
                }}
              >
                <div className="arrows">
                  <span>{sortPrice ? "⇣" : "⇡"}</span>
                </div>
              </div>
            </div>
            <div className="range">
              <span style={{ marginRight: 10 }}>Prix entre : </span>
              <PriceRange
                fetchRangeValues={fetchRangeValues}
                setFetchRangeValues={setFetchRangeValues}
              />
            </div>
          </div>
        ) : null}
      </header>
    </>
  );
};

export default Header;
