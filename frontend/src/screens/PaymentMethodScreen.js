import { useState } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { savePaymentMethod } from "../redux/actions/cartActions";

const PaymentMethodScreen = () => {
  const cart = useSelector((state) => state.cartReducer);
  const { shippingAddress } = cart;
  const [paymentMethod, setPaymentMethod] = useState("Paypal");

  const dispatch = useDispatch();
  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  if (!shippingAddress) history.push("/shipping");
  return (
    <div>
      <CheckoutSteps step1 step2 step3 />

      <form className='form' onSubmit={submitHandler}>
        <div>
          <h1>Payment</h1>
        </div>
        <div>
          <div>
            <input
              type='radio'
              id='paypal'
              value='Paypal'
              name='paymentMethod'
              required
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />

            <label htmlFor='paypal'>Paypal</label>
          </div>
          <div>
            <input
              type='radio'
              id='stripe'
              value='Stripe'
              name='paymentMethod'
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            />

            <label htmlFor='stripe'>Stripe</label>
          </div>
        </div>
        <div>
          <button type='submit' class='primary'>
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentMethodScreen;
