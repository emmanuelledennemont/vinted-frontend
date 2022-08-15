import { Link } from "react-router-dom";
import banner from "../images/banner.jpeg";
import axios from "axios";
import { useState, useEffect } from "react";

const Home = ({
  title,
  priceMin,
  priceMax,
  page,
  limit,
  sortPrice,
  setPriceMin,
  setPriceMax,
  setPage,
  setLimit,
}) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?title=${
            title ? title : ""
          }&priceMin=${priceMin ? priceMin : ""}&priceMax=${
            priceMax ? priceMax : ""
          }&page=${page ? page : ""}&limit=${limit ? limit : ""}&sort=${
            sortPrice ? "price-asc" : "price-desc"
          }`
        );
        setData(response.data);
      } catch (error) {
        console.log(error.response);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [title, priceMin, priceMax, page, limit, sortPrice]);

  const offersArray = data.offers;

  return (
    <>
      {isLoading ? (
        <h2>Is Loading... </h2>
      ) : (
        <div className="home">
          <section>
            <img src={banner} alt="" />
          </section>
          <div className="container">
            <div className="start">
              <h3>Prêts à faire du tri dans vos placards ?</h3>

              <Link to="/publish">
                <button>commencer à vendre</button>
              </Link>
            </div>
          </div>

          <div className="input-offers">
            <div className="input-left input-offers">
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
                id="price-min"
                value={priceMin}
                onChange={(event) => setPriceMin(Number(event.target.value))}
              />
              <label htmlFor="price-min">Prix min</label>
            </div>

            <div className="input-rigth input-offers">
              <input
                type="number"
                min="0"
                id="page"
                value={limit}
                onChange={(event) => setLimit(Number(event.target.value))}
              />
              <label htmlFor="page">Offres</label>
              <input
                min="0"
                type="number"
                id="page"
                value={page}
                onChange={(event) => setPage(Number(event.target.value))}
              />
              <label htmlFor="page">Page</label>
            </div>
          </div>

          <div className="all-cards container">
            {offersArray.map((element) => {
              const productArray = element.product_details;
              const id = element._id;

              return (
                <div className="cards-content">
                  <Link to={`/offers/${id}`} className="card" key={element._id}>
                    <div className="card-name">
                      {element.owner && (
                        <div>
                          {element.owner.account.avatar && (
                            <img
                              src={element.owner.account.avatar.url}
                              alt=""
                            />
                          )}
                        </div>
                      )}
                      {element.owner && (
                        <div>{element.owner.account.username}</div>
                      )}
                    </div>
                    <div className="card-img">
                      <img src={element.product_image.secure_url} alt="" />
                    </div>
                    <div className="card-price">{element.product_price} $</div>
                    <div className="name">{element.product_name}</div>

                    {productArray.map((product, index) => {
                      return (
                        <div key={index}>
                          <div>{product.MARQUE}</div>
                          <div>{product.TAILLE}</div>
                        </div>
                      );
                    })}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
