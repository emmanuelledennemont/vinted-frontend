import { Link } from "react-router-dom";
import banner from "../images/banner.jpeg";
import axios from "axios";
import { useState, useEffect } from "react";

const Home = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offers"
      );
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
              <button>Vends maintenant</button>
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
