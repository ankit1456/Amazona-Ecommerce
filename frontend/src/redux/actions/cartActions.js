import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT,
} from "../constants/cartConstants";
import Axios from "axios";
import Cookie from "js-cookie";
import { CART_SAVE_SHIPPING } from "./../constants/cartConstants";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  try {
    const product = await Axios.get(`/api/v1/products/${productId}`);

    const { name, _id, price, image, countInStock } = product.data.data.product;

    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: _id,
        name,
        image,
        price,
        countInStock,
        qty,
      },
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {}
};

export const removeFromCart = (productId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: productId,
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {}
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING,
    payload: data,
  });

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (paymentMethod) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT,
    payload: paymentMethod,
  });
};
