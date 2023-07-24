import React from "react";
import CheckOutSteps from "../Shipping/checkOutSteps";

const KhaltiPayment = () => {
  return (
    <div>
      <CheckOutSteps activeStep={2} />
      <h1>Payment</h1>
    </div>
  );
};

export default KhaltiPayment;
