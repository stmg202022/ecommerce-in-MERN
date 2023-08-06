import React, { useEffect, useState } from "react";
import Navbar from "./Component/Navbar/navbar";

import Loader from "./Component/layout/Loader/loader";

import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./Redux/Actions/userActions";
// import { }

import "./App.css";

export const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useSelector((state) => state.users);
  console.log("================================", isAuthenticated);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await dispatch(loadUser());
        setLoading(false);
      } catch (error) {
        // Handle any error during user loading
        // console.log(error);
        setLoading(false);
      }
    };

    fetchUser();
    //
  }, [dispatch]);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
    </div>
  );
};

export default App;
