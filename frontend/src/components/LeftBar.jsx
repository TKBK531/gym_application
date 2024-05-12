import React from "react";
import AvatarOnline from "./NavComponents/AvatarOnline";
import { pageLinks } from "../constants";
import PageLink from "./NavComponents/PageLink";
import { useQuery } from "@tanstack/react-query";

async function fetchUserProfile() {
  const response = await fetch("/api/user/profile");
  if (!response.ok) {
    throw new Error("Network response was not ok.");
  }
  return response.json();
}

const LeftBar = () => {
  const {
    isLoading,
    error,
    data: userProfile,
  } = useQuery("profile", fetchUserProfile);

  return (
    <div className=" w-[290px] bg-info-dark-blue h-screen">
      <div className="items-center text-center px-[70px] py-[40px]">
        <div className="flex justify-center">
          <AvatarOnline image={userProfile.profilePictureUrl} />
        </div>
        <div className="p-1">
          <h1 className="font-medium text-[16px] text-white">
            {userProfile.name}
          </h1>
          <h3 className="font-semibold text-gray-500 text-[12px]">
            {userProfile.profileStatus}
          </h3>
        </div>
      </div>
      <hr className="mb-10" />
      <div>
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
