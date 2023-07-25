import React, { Fragment } from "react";
import "./khalti.css";
import CheckOutSteps from "../Shipping/checkOutSteps";
import KhaltiCheckout from "khalti-checkout-web";
import axios from "axios";

const KhaltiPayment = ({ khaltiApiKey }) => {
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

        // const { token, amount } = payload;

        console.log(
          "generate token is++++++++++++++++++++++++++++++++++++++++++++++"
        );

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
            alert("Thank you for payment.");
            console.log(response.data); // Assuming the backend responds with success: true
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
              onClick={() => checkout.show({ amount: 1000 })}
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
