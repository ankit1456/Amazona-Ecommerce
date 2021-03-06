import CheckoutSteps from "./../components/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";

const PlaceorderScreen = () => {
  const cart = useSelector((state) => state.cartReducer);

  const history = useHistory();
  const dispatch = useDispatch();
  if (!cart.paymentMethod) {
    history.push("/paymentMethod");
  }

  const toPrice = (num) => Number(num.toFixed(2));

  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)
  );

  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(100);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const placeOrderHandler = () => {};

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />

      <div className='row top'>
        <div className='col-2'>
          <ul>
            <li>
              <div className='card card-body'>
                <h2>Shipping</h2>
                <p>
                  <strong>Name : </strong> {cart.shippingAddress.fullName}{" "}
                  <br />
                  <strong>Address :</strong> {cart.shippingAddress.address},
                  {cart.shippingAddress.city} ,{" "}
                  {cart.shippingAddress.postalCode},
                  {cart.shippingAddress.country}
                </p>
              </div>
            </li>

            <li>
              <div className='card card-body'>
                <h2>Payment</h2>
                <p>
                  <strong>Method : {cart.paymentMethod} </strong>{" "}
                  {cart.shippingAddress.paymentMethod}{" "}
                </p>
              </div>
            </li>

            <li>
              <div className='card card-body'>
                <h2>Order items</h2>
                <ul>
                  {cart.cartItems.map((item) => (
                    <li key={item.product}>
                      <div className='row'>
                        <div>
                          <img
                            className='small'
                            src={item.image}
                            alt={item.name}
                          />
                        </div>

                        <div className='min-30'>
                          <Link to={`/product/${item.product}`}>
                            {item.name}{" "}
                          </Link>
                        </div>

                        <div>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className='col-1'>
          <div className='card card-body'>
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className='row'>
                  <div>Items</div>
                  <div>${cart.itemsPrice.toFixed(2)}</div>
                </div>
              </li>

              <li>
                <div className='row'>
                  <div>Shipping</div>
                  <div>${cart.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className='row'>
                  <div>Taxes</div>
                  <div>${cart.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className='row'>
                  <div>Order Total</div>
                  <div>
                    <strong>${cart.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>

              <li>
                <button
                  type='button'
                  onClick={placeOrderHandler}
                  className='primary block'
                  disabled={cart.cartItems.length === 0}
                >
                  Place Order
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceorderScreen;
