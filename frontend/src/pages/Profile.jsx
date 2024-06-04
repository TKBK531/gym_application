import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

function Profile() {
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    profile_picture:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
    phone: "(+1) 555-1234567",
    age: 28,
    bio: "I'm currently working as a Software Developer",
    country: "USA",
    province: "California",
    city: "San Francisco",
    postalCode: "94105",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // const response = await axios.get("/api/profile"); // Fetch actual data when API is ready
        // setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError("Error fetching profile. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfileData();
  }, []);

  const handleEditClick = (section) => {
    console.log(`Edit ${section} clicked`);
  };

  if (isLoading) {
    return <div className="text-center p-8">Loading profile...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

  return (
    <section className="container mx-auto p-4 md:p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center md:text-left">
        Profile
      </h2>

      {/* Profile Picture */}
      <div className="flex justify-center mb-6">
        <img
          src={profileData.profile_picture}
          alt="Profile"
          className="w-24 h-24 rounded-full"
        />
      </div>

      {/* Personal Information Section */}
      <section className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-medium">Personal Information</h3>
          <button
            onClick={() => handleEditClick("Personal Information")}
            className="text-blue-500 hover:underline"
          >
            <FontAwesomeIcon icon={faUserEdit} className="mr-1" /> Edit
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">First Name:</p>
            <p className="font-medium">{profileData.firstName}</p>
          </div>
          <div>
            <p className="text-gray-600">Last Name:</p>
            <p className="font-medium">{profileData.lastName}</p>
          </div>
          <div>
            <p className="text-gray-600">Email Address:</p>
            <p className="font-medium">{profileData.email}</p>
          </div>
          <div>
            <p className="text-gray-600">Phone:</p>
            <p className="font-medium">{profileData.phone}</p>
          </div>
          <div>
            <p className="text-gray-600">Age:</p>
            <p className="font-medium">{profileData.age} years old</p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-gray-600">Bio:</p>
            <p className="font-medium">{profileData.bio}</p>
          </div>
        </div>
      </section>

      {/* Location Information Section */}
      <section>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-medium">Location Information</h3>
          <button
            onClick={() => handleEditClick("Location Information")}
            className="text-blue-500 hover:underline"
          >
            <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1" /> Edit
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Country:</p>
            <p className="font-medium">{profileData.country}</p>
          </div>
          <div>
            <p className="text-gray-600">State / Province:</p>
            <p className="font-medium">{profileData.province}</p>
          </div>
          <div>
            <p className="text-gray-600">City / District:</p>
            <p className="font-medium">{profileData.city}</p>
          </div>
          <div>
            <p className="text-gray-600">Postal Code:</p>
            <p className="font-medium">{profileData.postalCode}</p>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Profile;
