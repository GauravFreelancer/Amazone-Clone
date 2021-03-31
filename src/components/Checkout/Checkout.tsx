import React from "react";
import "./Checkout.css";
import Subtotal from "../Subtotal/Subtotal";
import { useStateValue } from "../../DataLayer/StateProvider";
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";

const Checkout: React.FC = () => {
  const [state , dispatch] = useStateValue();

  return (
    <div className="checkout">
      <div className="checkout__left">
        {state.basket.length === 0 ? (
          <div>
            <h2 className="checkout__title">Your shopping Basket is empty</h2>
          </div>
        ) : (
          <div>
            <h2 className="checkout__title">Your shopping Basket</h2>

            {state.basket?.map((item) => (
              <CheckoutProduct
                product = {item}
                key={item.id}
              />
            ))}
          </div>
        )}
      </div>
      {state.basket.length > 0 && (
        <div className="checkout__right ">
          <Subtotal />
        </div>
      )}
    </div>
  );
}

export default Checkout;
