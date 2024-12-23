// Librearies
import { Outlet } from "react-router-dom";

// Components
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

const LayoutPublic = () => {
  return (
    <>
      <div className="flex w-full flex-col min-h-screen">
        <Header />
        <div className="flex-grow bg-gray-50">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default LayoutPublic;
