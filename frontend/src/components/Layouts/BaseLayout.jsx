import { Outlet } from "react-router-dom";
import NavBar from "../NavBar";
import Leftbar from "../NavComponents/Leftbar";
import ScrollToTopButton from "../Buttons/ScrollToTopButton";
// import Drawer from "../NavComponents/Drawer";

const BaseLayout = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));

  return (
    <div className="grid h-screen grid-cols-[auto,1fr]">
      <div className="bg-gray-200 h-screen overflow-y-auto hidden sm:visible">
        <Leftbar userData={userData} />
        {/* <Drawer /> */}
      </div>
      <div className="flex flex-col">
        <div className="w-full bg-gray-200">
          <NavBar />
        </div>
        <div className="bg-slate-100 flex flex-col py-14 px-7">
          <Outlet />
        </div>
      </div>
      <ScrollToTopButton />
    </div>
  );
};

export default BaseLayout;
