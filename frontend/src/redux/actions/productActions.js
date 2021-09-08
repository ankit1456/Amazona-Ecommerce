import Axios from "axios";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_SAVE_REQUEST,
  PRODUCT_SAVE_SUCCESS,
  PRODUCT_SAVE_FAIL,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_REVIEW_SAVE_REQUEST,
  PRODUCT_REVIEW_SAVE_FAIL,
  PRODUCT_REVIEW_SAVE_SUCCESS,
} from "../constants/productConstants";

export const listProducts = async (dispatch) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });
  try {
    const res = await Axios.get("/api/v1/products");
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: res.data.data.products,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: err.message,
    });
  }
};

export const detailsProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });

    const product = await Axios.get(`/api/v1/products/${productId}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: product.data.data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// const deleteProdcut = (productId) => async (dispatch, getState) => {
//   try {
//     const {
//       userSignin: { userInfo },
//     } = getState();
//     dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
//     const { data } = await Axios.delete("/api/products/" + productId, {
//       headers: {
//         Authorization: "Bearer " + userInfo.token,
//       },
//     });
//     dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data, success: true });
//   } catch (error) {
//     dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message });
//   }
// };
