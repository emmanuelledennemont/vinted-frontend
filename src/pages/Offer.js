import { useParams, Navigate, Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Offer = ({ token }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
      );
      setData(response.data);
    } catch (error) {
      console.log(error.response);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  });

  return token ? (
    <>
      <div className="offer-page">
        {isLoading ? (
          <h2>Is Loading... </h2>
        ) : (
          <div className="page-product">
            <div className="product-images">
              <img className="img" src={data.product_image.secure_url} alt="" />
            </div>
            <div className="man">
              <div className="left">
               
                <div className="rigth">
                  <div className="infos-price">
                    <span>{data.product_price} €</span>
                  </div>

                  <div className="bloc-description">
                  {data.product_details.map((element) => {
                    return (
                      <>
                      
                        {element.MARQUE && (
                          <div className="product-details">
                           <p> marque :</p> <span>{element.MARQUE}</span>
                          </div>
                        )}
                        {element.TAILLE && (
                          <div className="product-details">
                           <p>taille :</p>  <span>{element.TAILLE}</span>
                          </div>
                        )}
                        {element.ETAT && (
                          <div className="product-details">
                          
                           <p>état :</p>  <span> {element.ETAT}</span>
                          </div>
                        )}
                        {element.COULEUR && (
                          <div className="product-details">
                           <p>couleur:</p>  <span>{element.COULEUR}</span>
                          </div>
                        )}
                        {element.EMPLACEMENT && (
                          <div className="product-details">
                          
                           <p>emplacement :</p>  <span>{element.EMPLACEMENT}</span>
                          </div>
                        )}
                        
                      </>
                    );
                  })}
                   </div>
                </div>
                <div className="separate"></div>
                <div className="card-description">
                  {data.product_name && (
                    <p className="product-name">{data.product_name}</p>
                  )}
                  {data.product_description && (
                    <p className="desc">{data.product_description}</p>
                  )}
                  <div className="owner">
                  {data.owner.account.avatar && (
                    <div className="offer-avatar">
                      <img src={data.owner.account.avatar.secure_url} alt="" />
                    </div>
                  )}
                  {data.owner && (
                    <p className="username">{data.owner.account.username}</p>
                  )}
                  </div>
                  <Link
                    to="/payment "
                    state={{
                      title: data.product_name,
                      price: data.product_price,
                    }}
                  >
                    <button>Acheter</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default Offer;
