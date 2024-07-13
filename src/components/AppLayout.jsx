import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function AppLayout() {
  return (
    <div className="flex overflow-y-hidden h-screen">
      <div className="lg:w-1/6 ">
        <Navbar />
      </div>
      <div className="flex-1 m-4 md:px-10 overflow-auto focus:overflow-contain">
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
