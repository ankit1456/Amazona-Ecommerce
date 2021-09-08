import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { addToCart, removeFromCart } from "./../redux/actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import MessageBox from "../components/MessageBox";

const CartScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const cart = useSelector((state) => state.cartReducer);
  const { cartItems } = cart;

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = () => {
    history.push("/signin?redirect=shipping");
  };
  return (
    <div className='row top'>
      <div className='col-2'>
        <h1>Shopping Cart </h1>
        {cartItems.length === 0 ? (
          <MessageBox>
            Cart is empty . <Link to='/'>Continue shipping</Link>{" "}
          </MessageBox>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.product}>
                <div className='row'>
                  <div>
                    <img className='small' src={item.image} alt={item.name} />
                  </div>

                  <div className='min-30'>
                    <Link to={`/product/${item.product}`}>{item.name} </Link>
                  </div>

                  <div>
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((el) => (
                        <option key={el + 1} value={el + 1}>
                          {el + 1}{" "}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>${item.price}</div>

                  <div>
                    <button
                      type='button'
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Delete{" "}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className='col-1'>
        <div className='card card-body'>
          <ul>
            <li>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}{" "}
                itmes) : $
                {cartItems.reduce(
                  (acc, item) => acc + item.price * item.qty,
                  0
                )}
              </h2>
            </li>

            <li>
              <button
                type='button'
                className='primary block'
                onClick={checkoutHandler}
                disabled={!cartItems.length}
              >
                Proceed to checkout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
