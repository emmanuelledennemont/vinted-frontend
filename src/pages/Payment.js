import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

const Payment = ({ token }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [completed, setCompleted] = useState(false);

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
          title: "Le Titre de l'annonce",
          amount: 10,
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

  return  (

    <div>

      {!completed ? (
        <form onSubmit={handleSubmit}>
          <CardElement />
          <button>Valider</button>
        </form>
      ) : (
        <span>Paiement effectué ! </span>
      )}
    </div>

  );
};

export default Payment;
