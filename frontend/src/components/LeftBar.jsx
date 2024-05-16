import React from "react";
import AvatarOnline from "./NavComponents/AvatarOnline";
import PageLink from "./NavComponents/PageLink";
import pageLinks from "../constants/index";

const LeftBar = ({ profileData }) => {
  return (
    <div className=" w-[290px] bg-info-dark-blue h-screen">
      <div className="items-center text-center py-10">
        <div className="flex justify-center">
          <AvatarOnline image="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600" />
          {/* {profileData && (
            <AvatarOnline image={profileData.profile.profile_picture} />
          )} */}
        </div>
        <div className="p-1">
          <h1 className="font-medium text-[16px] text-white">
            Tharindu Kasthuri
            {console.log(profileData)}
            {/* {profileData.user.first_name} {profileData.user.last_name} */}
          </h1>
          <h3 className="font-semibold text-gray-500 text-[12px]">
            tharindukasthurisinghe@gmail.com
            {/* {profileData.user.email} */}
          </h3>
        </div>
      </div>
      <hr className="mb-10" />
      <div>
        {/* <PageLink name={"Hello"} href={"/events"} /> */}
        {pageLinks.map((link) => (
          <PageLink
            key={link.index}
            href={link.href}
            icon={link.icon}
            name={link.name}
          />
        ))}
      </div>
    </div>
  );
};

export default LeftBar;
