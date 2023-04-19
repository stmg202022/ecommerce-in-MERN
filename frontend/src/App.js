import { Outlet } from "react-router-dom";
import Navbar from "./Component/navbar";
import Footer from "./Component/layout/Footer/footer.js";
// import Product from "./Component/layout/product";

const AppLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AppLayout;
