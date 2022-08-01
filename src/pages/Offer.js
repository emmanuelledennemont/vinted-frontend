import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Offer = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
      );
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchData();
  });

  const { id } = useParams();

  return (
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
                <p>{data.product_price} €</p>
              </div>
              
              {data.product_details.map((element) => {
                return (
                  <>
                    {element.MARQUE && <div> MARQUE : {element.MARQUE} </div>}
                    {element.TAILLE && <div>TAILLE : {element.TAILLE}</div>}
                    {element.ETAT && <div> ETAT : {element.ETAT}</div>}
                    {element.COULEUR && <div>COULEUR : {element.COULEUR}</div>}
                    {element.EMPLACEMENT && (
                      <div> EMPLACEMENT : {element.EMPLACEMENT}</div>
                    )}
                  </>
                );
              })}
            </div>
            <div className="null"></div>
            <div className="card-description">
              {data.product_name && (
                <p className="product-name">{data.product_name}</p>
              )}
              {data.product_description && (
                <p className="desc">{data.product_description}</p>
              )}
              {data.owner && (
                <p className="username">{data.owner.account.username}</p>
              )}
              {data.owner.account.avatar && (
                <div className="offer-avatar">
                  <img src={data.owner.account.avatar.secure_url} alt="" />
                </div>
              )}
              <button>Acheter</button>
            </div>
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default Offer;
