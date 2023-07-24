import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Shipping.css";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../../Redux/Actions/cartActions";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AddHomeIcon from "@mui/icons-material/AddHome";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import BalconyIcon from "@mui/icons-material/Balcony";
// import FlagCircleIcon from "@mui/icons-material/FlagCircle";
// import PersonPinCircleIcon from "@mui/icons-material/PersonPinCircle";
import PhoneIcon from "@mui/icons-material/Phone";

import CheckOutSteps from "../Shipping/checkOutSteps";

//======================states===================================

const states = [
  {
    name: "Bagmati",
    cities: ["Kathmandu", "Bhaktapur", "Lalitpur"],
  },
  {
    name: "Gandaki",
    cities: ["Pokhara", "Baglung", "Lamjung"],
  },
  // Add more objects for other states
];

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const handleStateChange = (event) => {
    setState(event.target.value);
    setCity("");
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      toast.error("Phone Number should be 10 digits.");
      return;
    }

    const data = {
      address,
      city,
      state,
      phoneNo,
    };

    dispatch(saveShippingInfo(data));

    navigate("/order/confirm");
  };

  return (
    <Fragment>
      <div className="mainShipping">
        <CheckOutSteps activeStep={0} />

        <div className="shippingContainer">
          <div className="shippingBox">
            <h2 className="shippingHeader">Shipping Details</h2>
            <form
              action=""
              // method="POST"
              className="shippingFrom"
              encType="multipart/form-data"
              onSubmit={shippingSubmit}
            >
              <div>
                <AddHomeIcon />
                <input
                  className="inputfield"
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              <div>
                <BalconyIcon />
                <select
                  id="state"
                  className="selectField"
                  value={state}
                  onChange={handleStateChange}
                >
                  <option value="">-- Select State --</option>
                  {states.map((state, index) => (
                    <option key={index} value={state.name}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
              {state && (
                <div>
                  <LocationCityIcon />
                  <select
                    id="city"
                    className="selectField"
                    value={city}
                    onChange={handleCityChange}
                  >
                    <option value="">-- Select City --</option>
                    {states
                      .find((st) => st.name === state)
                      .cities.map((city, index) => (
                        <option key={index} value={city}>
                          {city}
                        </option>
                      ))}
                  </select>
                </div>
              )}

              <div>
                <PhoneIcon />
                <input
                  className="inputfield"
                  type="number"
                  placeholder="Phone No"
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  required
                />
              </div>
              <input
                type="submit"
                value="Continue"
                className="shippingBtn"
                disabled={state ? false : true}
              />
              <div></div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
