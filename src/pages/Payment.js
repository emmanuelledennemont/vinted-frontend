import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";

const Payment = ({ token }) => {
  const location = useLocation();
  const title = location.state.title;
  const price = location.state.price;
  const stripe = useStripe();
  const elements = useElements();

  const [completed, setCompleted] = useState(false);

  const protectionFees = 0.4;
  const shippingFees = 0.8;
  const total = price + protectionFees + shippingFees;
  const totalPrice = total.toFixed(2);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const cardElement = elements.getElement(CardElement);

      const stripeResponse = await stripe.createToken(cardElement, {
        name: "L'id de l'acheteur",
      });
      const stripeToken = stripeResponse.token.id;
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          token: stripeToken,
          title: title,
          amount: price,
        }
      );
      if (response.data.status === "succeeded") {
        setCompleted(true);
      }
      console.log(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="card-payment">
      {!completed ? (
        <form onSubmit={handleSubmit}>
          <h5>Résumé de la commande</h5>
          <div className="">
            <div className="card-payment-contain first-bloc">
              <span>Commande</span>
              <span>{price} $</span>
              <span>Frais protection acheteurs</span>
              <span>{protectionFees}</span>
              <span>Frais de port</span>
              <span>{shippingFees}</span>
            </div>
            <div className="separation"></div>
            <div className="card-payment-contain second-bloc">
              <span>Total</span>
              <span>{totalPrice}</span>
            </div>
            <div className="conditions-bloc card-payment-contain"></div>
            <p>
              Il ne vous reste plus qu'une étape pour vous offrir
              <span>{title}</span> vous allez payer <span>{totalPrice}</span>{" "}
              (frais de protection et frais de port inclus).
            </p>
            <div className="separation"></div>
            <div className="card-payment-stripe">
              <div className="stripelement">
                <CardElement />
              </div>
              <button>Pay</button>
            </div>
          </div>
        </form>
      ) : (
        <div className="pay-column">
        <div className="pay">
        <span>Paiement effectué ! </span>
        <span>Merci pour votre achat</span>
        </div>
           <Link to="/" className="link-pay">
           Cliquez ici pour continuer votre shopping 
         </Link>
         </div>
      )}
    </div>
  );
};

export default Payment;
