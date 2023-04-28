import { Outlet } from "react-router-dom";
import Navbar from "./Component/Navbar/navbar";
// import Product from "./Component/layout/product";

const AppLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default AppLayout;
