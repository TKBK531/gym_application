import React, { useState, useEffect } from "react";

const ProfileDashboard = () => {
  const [profileData, setProfileData] = useState(null);
  const [profileEdits, setProfileEdits] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch initial profile data from localStorage (or your API)
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData) {
      setProfileData(storedData);
    } else {
      setError("User data not found in local storage.");
    }
  }, []);

  useEffect(() => {
    if (profileData) {
      setProfileEdits({ ...profileData });
    }
  }, [profileData]);

  useEffect(() => {
    const isDifferent =
      JSON.stringify(profileData) !== JSON.stringify(profileEdits);
    setHasChanges(isDifferent && editMode);
  }, [profileData, profileEdits, editMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileEdits((prevEdits) => ({
      ...prevEdits,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/update-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileEdits), // Send the edited data
      });

      if (response.ok) {
        const updatedData = await response.json();
        setProfileData(updatedData); // Update with the data from the server
        setEditMode(false);
      } else {
        console.error("Error updating profile:", response.statusText);
        // Handle the error (e.g., display an error message to the user)
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      // Handle the error (e.g., display an error message to the user)
    }
  };

  const handleClick = () => {
    // setEditMode(!editMode);
  };

  return (
    <section className="bg-gradient-to-br from-blue-100 to-purple-100 shadow-lg rounded-lg p-8 md:p-12 lg:p-16 max-w-screen-md">
      {/* <h1 className="text-3xl font-medium text-left text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 mb-8">
        Hi {profileData.last_name} <span className="text-white">👋🏻</span>,
      </h1> */}
      {console.log(profileData)}
      <div className="flex flex-col lg:flex-row lg:items-center space-y-8 lg:space-y-0 lg:space-x-8">
        {/* Profile Picture */}
        <div className="w-full lg:w-1/3 flex justify-center">
          <img
            src={profileData.profile_picture}
            alt="Profile"
            className="h-full object-cover w-full rounded-lg shadow-md"
          />
        </div>
        {/* User Information (Editable) */}
        <form onSubmit={handleSubmit} className="w-full lg:w-2/3 space-y-6">
          {/* Input fields for first name, last name, email, contact, etc. */}
          <div>
            <label htmlFor="firstName" className="block text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="first_name"
              value={profileEdits.first_name || ""}
              onChange={handleChange}
              disabled={!editMode}
              className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="last_name"
              value={profileEdits.last_name || ""}
              onChange={handleChange}
              disabled={!editMode}
              className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={profileEdits.email || ""}
              onChange={handleChange}
              disabled={!editMode}
              className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="contact" className="block text-gray-700">
              Contact
            </label>
            <input
              type="contact"
              id="contact"
              name="contact"
              value={profileEdits.contact || ""}
              onChange={handleChange}
              disabled={!editMode}
              className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-center lg:justify-end space-x-4">
            <button
              type="button"
              onClick={handleClick}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-2 px-6 rounded shadow-md"
            >
              Edit Profile
            </button>
            <button
              type="submit"
              disabled={!hasChanges}
              className={`bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold py-2 px-6 rounded shadow-md ${
                !hasChanges ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Save Changes
            </button>
          </div>
        </form>
        {/* Closing form tag */}
      </div>
    </section>
  );
};

export default ProfileDashboard;
