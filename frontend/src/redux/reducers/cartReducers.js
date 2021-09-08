import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING,
  CART_SAVE_PAYMENT,
} from "../constants/cartConstants";

export function cartReducer(state = { cartItems: [] }, action) {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existProduct = state.cartItems.find(
        (x) => x.product === item.product
      );
      if (existProduct) {
        return {
          ...state,
          cartItems: state.cartItems.map((el) =>
            el.product === existProduct.product ? item : el
          ),
        };
      }
      return { ...state, cartItems: [...state.cartItems, item] };
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case CART_SAVE_SHIPPING:
      return { ...state, shippingAddress: action.payload };
    case CART_SAVE_PAYMENT:
      return { ...state, paymentMethod: action.payload };
    default:
      return state;
  }
}
