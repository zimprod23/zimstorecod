import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartItemsV0,
  removeFromCartV0,
  //onSuccesBy,
} from "../../../actions/authAction";
import UserCartBlock from "./UserCarteBlockNoCred";
//import Paypal from "../../utils/Paypal";
import Empty from "./Empty.PNG";
import "./success.PNG";
//import StripeCheckout from "../../utils/StripeCheckoutGateway";
import { Button, Grid } from "@material-ui/core";
import { TgState } from "./ToogleState";
import OpenDialog from "./Checkout/OpenDialogNoCred";
import { addToCartV0 } from "../../../actions/authAction";
import { Payment, MonetizationOn } from "@material-ui/icons";

// function Success() {}
// function Faild() {}
function Mty() {
  return (
    <div
      style={{
        //width: "100%",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <br />
      <img src={Empty} />
    </div>
  );
}

function CartePage(props) {
  const dispatch = useDispatch();
  const CardData = useSelector((state) => state.auth.noCredCartDetail);
  const auth = useSelector((state) => state.auth);
  const [CardDetailsEo, setCardDetailsEo] = useState(null);
  const [Total, setTotal] = useState(0);
  const [ShowSuccess, setShowSuccess] = useState(false);
  const [ShowTotal, setShowTotal] = useState(false);
  const [method, setmethod] = useState("PAYPAL");

  useEffect(() => {
    let cartItems = [];
    if (auth.noCredCart) {
      if (auth.noCredCart.length > 0) {
        auth.noCredCart.forEach((element, i) => {
          cartItems.push(element.id);
        });
        dispatch(getCartItemsV0(cartItems, auth.noCredCart))
          .then((response) => {
            if (CardData && CardData.length > 0) {
              calculateTotal(CardData);
            }
          })
          .catch((err) => {
            alert("Could not show  total");
          });
      }
    }
  }, [auth.noCredCart]);
  const { toogle } = useContext(TgState);
  const [Toogle, setToogle] = toogle;
  const handleOpenDialog1 = () => {
    setToogle(true);
    setmethod("PAYPAL");
  };
  const handleOpenDialog2 = () => {
    setToogle(true);
    setmethod("COD");
  };

  useEffect(() => {
    const wholsome = () => {
      setTotal(0);
      setCardDetailsEo(null);
    };
    const wholesomeSu = () => {
      setCardDetailsEo(CardData);
      calculateTotal(CardData);
    };
    CardData && CardData.length > 0 ? wholesomeSu() : wholsome();
  }, [CardData, Total]);

  const RemoveButton = (id) => {
    dispatch(removeFromCartV0(id)).then((res) => {
      if (CardData && CardData.length <= 0) {
        setShowTotal(false);
      } else {
        calculateTotal(CardDetailsEo);
      }
    });
  };

  const calculateTotal = (cartDetail) => {
    let total = 0;

    cartDetail.map((item) => {
      total += parseFloat(item.price) * item.quantity;
    });
    total = total.toFixed(2);
    setTotal(total);
    setShowTotal(true);
  };

  const incrementQ = (id) => {
    dispatch(addToCartV0(id))
      .then((res) => console.log("We havin good time outta here"))
      .catch((err) => console.log("We are shit"));
    console.log(id);
  };
  const decrementQ = (productId) => {
    dispatch(addToCartV0(productId, null, "minus"))
      .then((res) => console.log("We havin good time outta here"))
      .catch((err) => window.location.replace("/signin"));
  };
  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h1>My Carte</h1>
      <UserCartBlock
        products={CardDetailsEo}
        removeItem={RemoveButton}
        incrementQ={incrementQ}
        decrementQ={decrementQ}
      />
      {ShowTotal ? (
        <div style={{ marginTop: "3rem" }}>
          <h2>Total amount: {Total} MAD</h2>
        </div>
      ) : (
        <Mty />
      )}
      {ShowTotal && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenDialog2}
              style={{ padding: "10px" }}
              startIcon={<MonetizationOn />}
            >
              الدفع عند الاستلام
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenDialog1}
              style={{ padding: "10px" }}
              startIcon={<Payment />}
              disabled
            >
              الدفع عن طريق باي بال
            </Button>
          </Grid>
        </Grid>
      )}
      {ShowTotal && (
        <OpenDialog toPay={Total} products={CardDetailsEo} method={method} />
      )}
    </div>
  );
}

export default CartePage;
