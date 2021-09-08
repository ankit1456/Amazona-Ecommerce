import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingAddress } from "../redux/actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

function ShippingScreen() {
  const user = useSelector((state) => state.userSigninReducer);
  const { userInfo } = user;

  const cart = useSelector((state) => state.cartReducer);

  const { shippingAddress } = cart;

  const [address, setAddress] = useState(
    shippingAddress?.address ? shippingAddress.address : ""
  );
  const [fullName, setFullName] = useState(
    shippingAddress?.fullName ? shippingAddress.fullName : ""
  );
  const [city, setCity] = useState(
    shippingAddress?.city ? shippingAddress.city : ""
  );
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode ? shippingAddress.postalCode : ""
  );
  const [country, setCountry] = useState(
    shippingAddress?.country ? shippingAddress.country : ""
  );

  const history = useHistory();
  const dispatch = useDispatch();

  if (!userInfo) history.push("/signin");

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      saveShippingAddress({ address, city, postalCode, country, fullName })
    );
    history.push("/paymentMethod");
  };
  return (
    <div>
      <CheckoutSteps step1 step2 />

      <form className='form' onSubmit={submitHandler}>
        <div>
          <h1>Shipping Address</h1>
        </div>

        <div>
          <label htmlFor='fullName'>Full Name</label>
          <input
            type='text'
            id='fullName'
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            placeholder='Full Name'
          />
          <label htmlFor='address'>Address</label>
          <input
            type='text'
            id='address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            placeholder='Address'
          />
          <label htmlFor='city'>City</label>
          <input
            type='text'
            id='city'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            placeholder='City'
          />
          <label htmlFor='Postalcode'>Postal Code</label>
          <input
            type='text'
            id='Postalcode'
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
            placeholder='Postal Code'
          />
          <label htmlFor='country'>Country</label>
          <input
            type='text'
            id='country'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            placeholder='Country'
          />
        </div>

        <div>
          <label>
            <button type='submit' className='primary block'>
              Continue
            </button>
          </label>
        </div>
      </form>
    </div>
  );
}
export default ShippingScreen;
