import AvatarOnline from "../components/AvatarOnline";
import React from "react";

const LeftBar = () => (
  <div>
    <div className="items-center text-center">
      <h1 className="font-poppins text-[30px]">University Gymnasium</h1>
      <div className="flex justify-center">
        <AvatarOnline image="https://picsum.photos/200/300" />
      </div>

      <h1 className="font-bold">Jenny Wilson</h1>
      <h3 className="text-xs text-gray-500">jennywilson@gmail.com</h3>
    </div>
    <h1>LeftBar</h1>
  </div>
);

export default LeftBar;
