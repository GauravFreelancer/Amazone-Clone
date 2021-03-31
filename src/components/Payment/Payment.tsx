import React, { useEffect, useState } from "react";
import "./Payment.css";
import { Link, useHistory } from "react-router-dom";
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";
import { useStateValue } from "./../../DataLayer/StateProvider";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import { StripeCardElement, StripeCardElementChangeEvent, StripeElements } from "@stripe/stripe-js";
import axios from "../../axios";
import { getBasketTotalAmount } from './../../DataLayer/reducer';
import { db } from "../../firebase";
import * as CurrencyFormat from 'currency-formatter';

const Payment: React.FC = () => {
  const [{ user, basket }, dispatch] = useStateValue();
  const history = useHistory();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState<boolean>(false);
  const [succeeded, setSucceeded] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [clientSecret, setClientSecret] = useState<string>("");

  useEffect(() => {
      const getClientSecret = async () => {
        const response = await axios({
          method: 'POST',
          url: `/payments/create?total=${getBasketTotalAmount(basket) * 100}`
        });

        setClientSecret(response.data.clientSecret)
      }

      getClientSecret();
  }, [basket])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe?.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements?.getElement(CardElement) as StripeCardElement 
      }
    }).then(({ paymentIntent }) => {

      db.collection('users').doc(user?.uid).collection('orders').doc(paymentIntent?.id).set({
        basket:basket,
        amount: paymentIntent?.amount,
        created: paymentIntent?.created
      })

      setSucceeded(true);
      setError(null);
      setProcessing(false);

      dispatch({
        type:"EMPTY_BASKET"
      });

      history.replace('/orders');
    })
  };

  const handleChange = (event: StripeCardElementChangeEvent) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>Checkout {<Link to="/checkout">{basket?.length} items</Link>}</h1>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angels, CA</p>
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items in Delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                key={item.id}
                product= {item}
              />
            ))}
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <h3>Order Total: {CurrencyFormat.format(getBasketTotalAmount(basket), CurrencyFormat.findCurrency('INR'))}</h3>
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
            </form>
          </div>

          {error && <div>{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default Payment;
