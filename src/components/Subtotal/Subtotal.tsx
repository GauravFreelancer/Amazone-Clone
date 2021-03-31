import React from "react";
import "./Subtotal.css";
import { useStateValue } from "../../DataLayer/StateProvider";
import { getBasketTotalAmount } from "../../DataLayer/reducer";
import { useHistory } from "react-router-dom";
import * as CurrencyFormat from 'currency-formatter';

const Subtotal: React.FC = () => {
  const history = useHistory();
  const [{ basket }, dispatch] = useStateValue();

  return (
    <div className="subtotal">
      <p>
        Subtotal (0 items): <strong>{CurrencyFormat.format(getBasketTotalAmount(basket), CurrencyFormat.findCurrency('INR'))}</strong>
      </p>
      <small className="subtotal__gift">
        <input type="checkbox" /> This order contains a gift
      </small>
      {/* <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal (0 items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotalAmount(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefi={"$"}
      /> */}
      <button onClick={(e) => history.push("/payment")}>
        Procced to Checkout
      </button>
    </div>
  );
};

export default Subtotal;
