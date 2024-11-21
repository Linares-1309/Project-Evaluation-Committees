import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

const LayoutPublic = () => {
  return (
    <>
    



      <div className="flex w-full flex-col min-h-screen">
        <Header />
        <div className="flex-grow px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default LayoutPublic;
