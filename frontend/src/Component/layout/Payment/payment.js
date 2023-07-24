// import React, { Fragment, useState, useRef } from "react";
// import "./Payment.css";

// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import { Typography } from "@mui/material";
// import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
// import EventIcon from "@mui/icons-material/Event";
// import VpnKeyIcon from "@mui/icons-material/VpnKey";
// import CheckOutSteps from "../Shipping/checkOutSteps";

// import {
//   CardNumberElement,
//   CardCvcElement,
//   CardExpiryElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";

// import { useSelector } from "react-redux";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Payment = () => {
//   const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

//   // const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const stripe = useStripe();
//   const elements = useElements();
//   const payBtn = useRef(null);

//   const { shippingInfo, cartItems } = useSelector((state) => state.cart);
//   const { user } = useSelector((state) => state.users);
//   // console.log(user);

//   // const { error } = useSelector((state) => state.newOrder);

//   const paymentData = {
//     amount: Math.round(orderInfo.totalPrice * 100),
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     payBtn.current.disabled = true;

//     try {
//       // const config = {
//       //   headers: {
//       //     "Content-type": "application/json",
//       //   },
//       // };

//       const cookies = document.cookie.split(";");
//       let token = "";
//       cookies.forEach((cookie) => {
//         const [name, value] = cookie.trim().split("=");
//         if (name === "token") {
//           token = value;
//         }
//       });

//       console.log({ token });

//       const { data } = await axios.post(
//         "http://localhost:8080/api/v1/payment/process",
//         paymentData, // Pass updateData as the request body
//         {
//           headers: {
//             authorization: token,
//           },
//         }
//       );

//       const client_secret = await data.client_secret;

//       console.log("the client secret key is: ", client_secret);
//       //

//       if (!stripe || !elements) {
//         console.log("Stripe and elements is false");
//         return;
//       }

//       console.log(
//         shippingInfo.address,
//         shippingInfo.city,
//         shippingInfo.state,
//         shippingInfo.phoneNo
//       );

//       const result = await stripe.confirmCardPayment(client_secret, {
//         payment_method: {
//           card: elements.getElement(CardNumberElement),
//           billing_details: {
//             name: user.name,
//             email: user.email,
//             address: {
//               line1: shippingInfo.address,
//               city: shippingInfo.city,
//               state: shippingInfo.state,
//               phone: shippingInfo.phoneNo,
//             },
//           },
//         },
//       });

//       //result is getting error
//       console.log(result.error);
//     } catch (error) {
//       payBtn.current.disabled = false;
//     }
//   };

//   return (
//     <Fragment>
//       <CheckOutSteps activeStep={2} />
//       <div className="paymentContainer">
//         <form
//           action=""
//           className="paymentForm"
//           onSubmit={(e) => submitHandler(e)}
//         >
//           <Typography>Card Info</Typography>
//           <div>
//             <CreditCardRoundedIcon />
//             <CardNumberElement className="paymentInput" />
//           </div>
//           <div>
//             <EventIcon />
//             <CardExpiryElement className="paymentInput" />
//           </div>
//           <div>
//             <VpnKeyIcon />
//             <CardCvcElement className="paymentInput" />
//           </div>
//           <div>
//             <input
//               type="submit"
//               className="paymentFormBtn"
//               ref={payBtn}
//               value={`Pay - NRs.${orderInfo.totalPrice}/-`}
//             />
//           </div>
//         </form>
//       </div>
//     </Fragment>
//   );
// };

// export default Payment;
