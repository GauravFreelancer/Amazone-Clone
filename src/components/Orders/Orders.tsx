import React, { useEffect, useState } from "react";
import "./Orders.css";
import { useStateValue } from "./../../DataLayer/StateProvider";
import { db } from "../../firebase";
import Order from './Order/Order';
import { IOrder } from './../../models/Order';



const Orders: React.FC = () => {
  const [{ user, basket }, dispatch] = useStateValue();
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="orders__order">
        {
            orders?.map(order => (
                <Order order={order} key={order.id}/>
            ))
        }
      </div>
    </div>
  );
};

export default Orders;
