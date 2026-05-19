import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <div className=" md:w-350 bg-[#EAECED] mx-auto">
      <div className="md:max-w-7xl mx-auto">
        <Navbar />
        <div className="min-h-[calc(100vh-300px)]">
          <Outlet></Outlet>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
