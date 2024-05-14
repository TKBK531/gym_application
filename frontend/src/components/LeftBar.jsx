import api from "../api";
import { useState, useEffect } from "react";
import AvatarOnline from "./NavComponents/AvatarOnline";
import { pageLinks } from "../constants";
import PageLink from "./NavComponents/PageLink";

const LeftBar = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get(BASE_URL + "/user/profile/");
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className=" w-[290px] bg-info-dark-blue h-screen">
      <div className="items-center text-center py-10">
        <div className="flex justify-center">
          <AvatarOnline image="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600" />
        </div>
        <div className="p-1">
          <h1 className="font-medium text-[16px] text-white">
            Tharindu Kasthuri
          </h1>
          <h3 className="font-semibold text-gray-500 text-[12px]">
            tharindukasthuri@gmail.com
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
