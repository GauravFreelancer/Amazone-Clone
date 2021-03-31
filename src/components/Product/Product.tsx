import React from "react";
import "./Product.css";
import { useStateValue } from "../../DataLayer/StateProvider";
import { IProduct } from "../../models/Product";

const Product: React.FC<IProduct> = ({ id, title, image, price, rating }) => {
  const [state, dispatch] = useStateValue();

  const addToBasket = () => {
    dispatch  ({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating
      }
    });
  };

  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>₹ </small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill(0)
            .map((_, i) => (
              <p key={i}>⭐</p>
            ))}
        </div>
      </div>
      <img src={image}></img>
      <button onClick={addToBasket}>Add to basket</button>
    </div>
  );
}

export default Product;
