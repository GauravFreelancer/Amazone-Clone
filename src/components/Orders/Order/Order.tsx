import React from "react";
import "./Order.css";
import { IOrder } from './../../../models/Order';
import moment from 'moment';
import CheckoutProduct from "../../CheckoutProduct/CheckoutProduct";
import { IProduct } from './../../../models/Product';
import * as CurrencyFormat from 'currency-formatter';

interface Props {
    order: IOrder
}

const Order: React.FC<Props> = ({order}) => {
  return <div className="order">
      <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
      <p className="order__id">
        <small>{order.id}</small>
      </p>
      {order.data.basket?.map((item: IProduct) => (
        <CheckoutProduct
          key={item.id}
          product = {item}
          hideButton = {true}
        />
      ))}
      <h3 className="order__total">Order Total: {CurrencyFormat.format(order.data.amount, CurrencyFormat.findCurrency('INR'))}</h3>
  </div>;
};

export default Order;
