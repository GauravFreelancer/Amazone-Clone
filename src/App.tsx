import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Checkout from "./components/Checkout/Checkout";
import Login from "./components/Login/Login";
import { auth } from "./firebase";
import { useStateValue } from "./DataLayer/StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./components/Payment/Payment";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./components/Orders/Orders";

const promise = loadStripe(
  "pk_test_51IVYcLJwabuxSCd3QmkzZs9v6J2gWKphHTNlQ7YZcKNSnVwMATnkbC23mxnR4fO6iRvtJQ9U2L1Wj1YHxrYkCIBy0052YIslvs"
);

const App: React.FC = () => {
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
