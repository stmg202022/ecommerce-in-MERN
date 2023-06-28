import React, { useEffect, useState } from "react";
import Navbar from "./Component/Navbar/navbar";

import Loader from "./Component/layout/Loader/loader";

// import store from "./stores";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./Redux/Actions/userActions";

import "./App.css";

const App = () => {
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
  }, [dispatch]);

  if (loading) {
    // Optional: Render a loading spinner or placeholder while user is being loaded
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      {/* Other components or content */}
    </div>
  );
};

export default App;
