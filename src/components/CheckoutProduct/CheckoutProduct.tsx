import React from "react";
import "./CheckoutProduct.css";
import { useStateValue } from "../../DataLayer/StateProvider";
import { IProduct } from './../../models/Product';

interface Props {
  product: IProduct,
  hideButton?: boolean
}

const CheckoutProduct: React.FC<Props> = ({ product, hideButton }) => {
  const [state, dispatch] = useStateValue();

  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: product.id,
    });
  };

  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct__image" src={product.image}></img>
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{product.title}</p>

        <p className="checkoutProduct__price">
          <small>₹ </small>
          <strong>{product.price}</strong>
        </p>

        <div className="checkoutProduct__rating">
          {Array(product.rating)
            .fill(0)
            .map((_, i) => (
              <p key={i}>⭐</p>
            ))}
        </div>
        {!hideButton && (
          <button onClick={removeFromBasket}>Remove from basket</button>
        )}
      </div>
    </div>
  );
}

export default CheckoutProduct;
