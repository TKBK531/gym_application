import AvatarOnline from "./NavComponents/AvatarOnline";
import PageLink from "./NavComponents/PageLink";
import pageLinks from "../constants/index";
import PropTypes from "prop-types";

const LeftBar = ({ profileData }) => {
  return (
    <div className=" w-[290px] bg-info-dark-blue h-full">
      <div className="items-center text-center py-10">
        <div className="flex justify-center">
          {profileData ? (
            <AvatarOnline image={profileData.profile_picture} />
          ) : (
            <AvatarOnline image="/path/to/default-avatar.jpg" /> // Placeholder image
          )}
        </div>
        <div className="p-1">
          <h1 className="font-medium text-[16px] text-white">
            {profileData?.first_name || "John"}{" "}
            {profileData?.last_name || "Doe"}
          </h1>
          <h3 className="font-semibold text-gray-500 text-[12px]">
            {profileData?.email || "johndoe@example.com"}
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

LeftBar.propTypes = {
  profileData: PropTypes.object.isRequired,
};

export default LeftBar;
