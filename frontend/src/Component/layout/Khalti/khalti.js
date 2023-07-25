import React, { Fragment } from "react";
import "./khalti.css";
import CheckOutSteps from "../Shipping/checkOutSteps";
import KhaltiCheckout from "khalti-checkout-web";
import axios from "axios";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const KhaltiPayment = ({ khaltiApiKey }) => {
  const navigate = useNavigate();
  //

  //
  //this is orderInfoPrice  which contains calculations of product with:
  // shippingCharge: 0;
  // subtotal: 745900;
  // tax: 134262;
  // totalPrice: 880162;
  const orderInfoPrice = JSON.parse(sessionStorage.getItem("orderInfo"));
  // console.log(orderInfoPrice);
  const { totalPrice } = orderInfoPrice;
  // console.log(totalPrice);
  //

  //this is from shippingInfo form which contains:
  // address: "khokana";
  // city: "Lalitpur";
  // phoneNo: "9867543210";
  // state: "Bagmati";
  // Also cartItems is the Arraylists of each product containing:
  // image: "https://cdn.vox-cdn.com/thumbor/08jubjGM7E7FStVppBEAc0u489E=/0x0:2040x1360/1400x1400/filters:focal(1020x680:1021x681)/cdn.vox-cdn.com/uploads/chorus_asset/file/13272937/jbareham_181012_2989_0549.jpg";
  // name: "android5";
  // price: 90000;
  // product: "642ff5b918ed2acd2f2b8a8f";
  // quantity: 1;
  // stock: 3;
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  console.log(
    "shippingInfo is",
    shippingInfo,
    "and listof item is:",
    cartItems
  );

  //This contains user details:
  const { user } = useSelector((state) => state.users);
  console.log(user);
  //

  // Define your config object here with the correct publicKey
  const config = {
    publicKey: khaltiApiKey,
    productIdentity: "00004",
    productName: "Drogon",
    productUrl: "http://gameofthrones.com/buy/Dragons",
    eventHandler: {
      async onSuccess(payload) {
        // hit merchant api for initiating verification
        console.log(payload);

        const cookies = document.cookie.split(";");

        let authToken = "";
        cookies.forEach((cookie) => {
          const [name, value] = cookie.trim().split("=");

          if (name === "token") {
            authToken = value;
          }
        });

        await axios
          .post(
            "http://localhost:8080/api/v1/khalti/payment/process",
            payload,
            {
              headers: {
                authorization: authToken,
              },
            }
          )
          .then((response) => {
            // Assuming the backend responds with success: true

            navigate("/success");
            console.log(response.data);
          })
          .catch((error) => {
            console.error("Error processing payment:", error);
          });

        //================================================================================================
      },

      onError(error) {
        // handle errors
        console.log(error);
      },
      onClose() {
        console.log("widget is closing");
      },
    },
    paymentPreference: [
      "KHALTI",
      "EBANKING",
      "MOBILE_BANKING",
      "CONNECT_IPS",
      "SCT",
    ],
  };

  const checkout = new KhaltiCheckout(config);

  return (
    <Fragment>
      <CheckOutSteps activeStep={2} />
      <div className="khaltiContainer">
        <div className="khaltitForm">
          <div className="khaltiForm_content">
            <h1>Payment</h1>
            <button
              onClick={() =>
                checkout.show({ amount: Math.round(totalPrice / 100) })
              }
              className="paybutton"
            >
              Pay via Khalti
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default KhaltiPayment;
