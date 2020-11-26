import {
  USER_LOADED,
  USER_LOADING,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  GET_USERS,
  ADD_TO_CARD,
  GET_CARD_ITEMS,
  REMOVE_CARD_ITEM,
  ON_SUCCESS_BUY,
  ADD_TO_CARD_V0,
  GET_CARD_ITEMS_V0,
  REMOVE_CARD_ITEM_V0,
  ON_SUCCESS_BUY_V0,
  LOAD_COOKIE,
} from "../actions/types";
import axios from "axios";

//import { returnErrors } from "./errorAction";
export const fetch_cookie = () => async (dispatch) => {
  await axios.get("/api/user/noauth").then((res) => {
    dispatch({
      type: LOAD_COOKIE,
      payload: res.data.cart,
    });
  });
};
export const userAuth = () => async (dispatch, getState) => {
  dispatch({
    type: USER_LOADING,
  });
  const resultat = await axios
    .get("/api/user/auth", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    });
};

export const register = (dataToSubmit) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  dataToSubmit = JSON.stringify(dataToSubmit);
  const resp = await axios
    .post("/api/user/register", dataToSubmit, config)
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    });
};

export const login = (newuser) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  newuser = JSON.stringify(newuser);

  await axios.post("/api/user/login", newuser, config).then((res) => {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    console.log("Data fetched ********");
  });
  /* .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        console.log("Cannot fetch the damn data");
      });*/
};

export const addToCart = (productId, size = null, command = null) => async (
  dispatch
) => {
  await axios
    .get(
      `/api/user/addToCart?productId=${productId}&command=${command}&size=${size}`,
      tokenConfig()
    )
    .then((res) => {
      dispatch({
        type: ADD_TO_CARD,
        payload: res.data,
      });
    });
};

export const getCartItems = (cartItems, userCart) => async (dispatch) => {
  await axios
    .get(`/api/user/products_by_id?id=${cartItems}&type=array`)
    .then((response) => {
      //Make CartDetail inside Redux Store
      // We need to add quantity data to Product Information that come from Product Collection.

      userCart.forEach((cartItem) => {
        response.data.forEach((productDetail, i) => {
          if (cartItem.id === productDetail._id) {
            response.data[i].quantity = cartItem.quantity;
            response.data[i].size = cartItem.size;
          }
        });
      });
      dispatch({
        type: GET_CARD_ITEMS,
        payload: response.data,
      });
    });
};

export const removeFromCart = (id) => async (dispatch) => {
  await axios
    .get(`/api/user/removeFromCart?_id=${id}`, tokenConfig())
    .then((res) => {
      res.data.cart.forEach((item) => {
        res.data.cartDetail.forEach((k, i) => {
          if (item.id === k._id) {
            res.data.cartDetail[i].quantity = item.quantity;
            res.data.cartDetail[i].size = item.size;
          }
        });
      });
      dispatch({
        type: REMOVE_CARD_ITEM,
        payload: res.data,
      });
    });
};

export const onSuccesBy = (data) => async (dispatch) => {
  await axios.post("/api/user/successBuy", data, tokenConfig()).then((res) => {
    dispatch({
      type: ON_SUCCESS_BUY,
      payload: res.data,
    });
  });
};

export const OnReportSubmit = (data) => async () => {
  data = JSON.stringify(data);
  await axios
    .post("/api/user/submitreport", data, tokenConfig())
    .then((res) => {
      console.log("Report submitted");
    });
};

export const dropHistory = () => async () => {
  await axios
    .delete("/api/user/dropHistory", tokenConfig())
    .then((res) => {
      window.location.reload();
    })
    .catch((err) => {
      alert("Oooops something went wrong");
    });
};

export const ChangeCred = (data) => async () => {
  data = JSON.stringify(data);
  axios.patch("/api/user/changeStuffs", data, tokenConfig()).then((res) => {
    console.log("data changed");
  });
};
export const SuspendAccount = () => async () => {
  axios.patch("/api/user/suspendAccount", null, tokenConfig()).then((res) => {
    console.log("Good bye 😢");
  });
};

export const tokenConfig = () => {
  const token = localStorage.getItem("token");
  //const token = getState().auth.token;
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
};

export const getAllUsers = () => (dispatch) => {
  axios
    .get("/api/user/allusers")
    .then((res) => {
      dispatch({
        type: GET_USERS,
        payload: res.data,
      });
      console.log(res);
    })
    .catch((err) => {
      alert("Cannot get any data");
    });
};

/**
 * For none configured users
 */

export const addToCartV0 = (productId, size = null, command = null) => async (
  dispatch
) => {
  await axios
    .get(
      `/api/user/addToCartV0?productId=${productId}&command=${command}&size=${size}`,
      tokenConfig()
    )
    .then((res) => {
      dispatch({
        type: ADD_TO_CARD_V0,
        payload: res.data,
      });
    });
};

export const getCartItemsV0 = (cartItems, userCart) => async (dispatch) => {
  await axios
    .get(`/api/user/products_by_idV0?id=${cartItems}&type=array`)
    .then((response) => {
      //Make CartDetail inside Redux Store
      // We need to add quantity data to Product Information that come from Product Collection.

      userCart.forEach((cartItem) => {
        response.data.forEach((productDetail, i) => {
          if (cartItem.id === productDetail._id) {
            response.data[i].quantity = cartItem.quantity;
            response.data[i].size = cartItem.size;
          }
        });
      });
      dispatch({
        type: GET_CARD_ITEMS_V0,
        payload: response.data,
      });
    });
};

export const removeFromCartV0 = (id) => async (dispatch) => {
  await axios
    .get(`/api/user/removeFromCartV0?_id=${id}`, tokenConfig())
    .then((res) => {
      res.data.cart.forEach((item) => {
        res.data.cartDetail.forEach((k, i) => {
          if (item.id === k._id) {
            res.data.cartDetail[i].quantity = item.quantity;
            res.data.cartDetail[i].size = item.size;
          }
        });
      });
      dispatch({
        type: REMOVE_CARD_ITEM_V0,
        payload: res.data,
      });
    });
};
export const onSuccesByV0 = (data) => async (dispatch) => {
  await axios
    .post("/api/user/successBuyV0", data, tokenConfig())
    .then((res) => {
      dispatch({
        type: ON_SUCCESS_BUY_V0,
        payload: res.data,
      });
    });
};
