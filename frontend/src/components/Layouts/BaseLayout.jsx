// import { Outlet } from "react-router-dom";
// import NavBar from "../NavBar";
// import Leftbar from "../NavComponents/Leftbar";
// import ScrollToTopButton from "../Buttons/ScrollToTopButton";

// const BaseLayout = () => {
//   const userData = JSON.parse(localStorage.getItem("userData"));

//   return (
//     <div className="grid h-screen grid-rows-[auto,1fr]">
//       <div className="w-full bg-gray-200">
//         <NavBar />
//       </div>
//       <div className="grid grid-cols-[auto,1fr]">
//         <div className="bg-gray-200 h-screen overflow-y-auto">
//           <Leftbar userData={userData} />
//         </div>
//         <div className="bg-slate-100 flex flex-col py-14 px-7">
//           <Outlet />
//         </div>
//       </div>
//       <ScrollToTopButton />
//     </div>
//   );
// };

// export default BaseLayout;
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../NavBar";
import Leftbar from "../NavComponents/Leftbar";
import ScrollToTopButton from "../Buttons/ScrollToTopButton";

const BaseLayout = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [isLeftbarVisible, setIsLeftbarVisible] = useState(false);

  const handleHamburgerClick = () => {
    setIsLeftbarVisible(!isLeftbarVisible);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="w-full bg-gray-200">
        <NavBar onHamburgerClick={handleHamburgerClick} />
      </div>
      <div className="flex flex-1 overflow-hidden w-fit">
        <div
          className={`bg-gray-200 md:block ${
            isLeftbarVisible ? "block" : "hidden"
          } absolute z-10 md:relative w-64 md:w-auto transition-transform transform md:translate-x-0 ${
            isLeftbarVisible ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Leftbar userData={userData} />
        </div>
        <div className="flex-1 bg-slate-100 flex flex-col py-14 px-7 overflow-auto">
          <Outlet />
        </div>
      </div>
      <ScrollToTopButton />
    </div>
  );
};

export default BaseLayout;
