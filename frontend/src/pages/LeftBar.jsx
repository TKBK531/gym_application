import AvatarOnline from "../components/AvatarOnline";
import React from "react";

const LeftBar = () => (
  <div className=" w-[290px]">
    <div className="items-center text-center px-[70px] py-[40px]">
      {/* <h1 className="font-poppins text-[30px]">University Gymnasium</h1> */}
      <div className="flex justify-center">
        <AvatarOnline image="https://picsum.photos/200/300" />
      </div>
      <div className="p-1">
        <h1 className="font-medium text-[16px]">Alesia K.</h1>
        <h3 className="font-semibold text-gray-500 text-[12px]">
          Basic Member
        </h3>
      </div>
    </div>
    <h1>LeftBar</h1>
  </div>
);

export default LeftBar;
