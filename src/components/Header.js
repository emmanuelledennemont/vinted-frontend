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
  box,
  setBox,
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
            <span>Trier par prix : </span>
            <input
              type="checkbox"
              checked={box}
              onChange={() => {}}
              name="price"
            />
            <div
              className="wrapper"
              onClick={() => {
                setBox(!box);
              }}
            >
              <div className="arrows">
                <span>{box ? "⇣" : "⇡"}</span>
              </div>
            </div>
            <div className="range">
              <span style={{ marginRight: 10 }}>Prix entre : </span>
              <PriceRange
                setFetchRangeValues={setFetchRangeValues}
                priceMin={priceMin}
                priceMax={priceMax}
                setPriceMin={setPriceMin}
                setPriceMax={setPriceMax}
              />
            </div>
            <input
              min="0"
              type="number"
              id="price-min"
              value={priceMin}
              onChange={(event) => setPriceMin(Number(event.target.value))}
            />
            <label htmlFor="price-min">Prix min</label>

            <input
              min="0"
              type="number"
              id="price-max"
              value={priceMax}
              onChange={(event) => setPriceMax(Number(event.target.value))}
            />
            <label htmlFor="price-max">Prix max</label>

            <input
              min="0"
              type="number"
              id="page"
              value={page}
              onChange={(event) => setPage(Number(event.target.value))}
            />
            <label htmlFor="page">Page</label>

            <input
              type="number"
              min="0"
              id="page"
              value={limit}
              onChange={(event) => setLimit(Number(event.target.value))}
            />
            <label htmlFor="page">Offres</label>
          </div>
        ) : null}
      </header>
    </>
  );
};

export default Header;
