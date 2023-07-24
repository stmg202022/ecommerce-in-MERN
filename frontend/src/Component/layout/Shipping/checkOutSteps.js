import React, { Fragment } from "react";
import "./checkoutStep.css";

import { Typography } from "@mui/material";

import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import PaymentsIcon from "@mui/icons-material/Payments";

import { Stepper, Step, StepLabel } from "@mui/material";

const CheckOutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <LocalShippingIcon />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <LibraryAddCheckIcon />,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <PaymentsIcon />,
    },
  ];

  const stepStyles = {
    boxSizing: "border-box",
    width: "80%",
  };
  return (
    <Fragment>
      <div className="checkOutStepcontainer">
        <Stepper
          activeStep={activeStep}
          alternativelabe="true"
          style={stepStyles}
        >
          {steps.map((item, index) => (
            <Step
              key={index}
              active={activeStep === index ? true : false}
              completed={activeStep >= index ? true : false}
            >
              <StepLabel
                style={{ color: activeStep >= index ? "tomato" : "none" }}
                icon={item.icon}
              >
                {item.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
    </Fragment>
  );
};

export default CheckOutSteps;
