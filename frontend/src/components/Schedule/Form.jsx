import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../../api"


const Form = ({ isOpen, onClose }) => {
  const [applicantName, setApplicantName] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser]  = useState('');
  const [emailError, setEmailError] = useState('');
  const [teamName, setTeamName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [requirement, setRequirement] = useState('');
  const [selectedFacility, setSelectedFacility] = useState('');
  const [court, setCourt] = useState('');
  const [numOfCourts, setNumOfCourts] = useState('');
  const [numOfCourtsError, setNumOfCourtsError] = useState('');
  const [activity, setActivity] = useState('');
  const [rateType, setRateType] = useState('hourly_rate');
  const [formState, setFormState] = useState({
    isSchool: false,
    isGovernment: false,
    isForeign: false,
    isCompetitive: false,
    isUOPUndergraduate: false,
  });
  const [numOfParticipants, setNumOfParticipants] = useState('');
  const [participantsData, setParticipantsData] = useState([]);
  const [tableData, setTableData] = useState([]);

// --------------------------------------------------------------------
  const [facilities, setFacilities] = useState([]);
  const [allCourts, setAllCourts] = useState([]);
  const [filteredCourts, setFilteredCourts] = useState([]);
  const [maxCourts, setMaxCourts] = useState([]);
  const [allCourtRates, setAllCourtRates] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [filteredRateTypes, setFilteredRateTypes] = useState([]);
  const [fetchError, setFetchError] = useState('');
  const [bookedSlots, setBookedSlots] = useState([]);


  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/user/profile/');
        const firstName = response.data?.data?.user?.first_name || '';
        const lastName = response.data?.data?.user?.last_name || '';
        const name = `${firstName} ${lastName}`.trim();
        const username = response.data?.data?.user?.username || '';
        setApplicantName(name);
        setEmail(username);
        setUser(response.data?.data?.user);
      } catch (error) {
        console.error("Failed to fetch name:", error);
        setFetchError('Failed to load user profile. Please try again.');
      }
    };

    const fetchFacilities = async () => {
      try {
        const response = await api.get('/reservation/requestAllFacilities/');
        setFacilities(response.data);
      } catch (error) {
        console.error("Failed to fetch facilities:", error);
        setFetchError('Failed to load facilities. Please try again.');
      }
    };

    const fetchCourts = async () => {
      try {
        const response = await api.get('/reservation/requestAllCourts/');
        setAllCourts(response.data)
      } catch (error) {
        console.error("Failed to fetch courts:", error);
        setFetchError('Failed to load courts. Please try again.');
      }
    };


    const fetchCourtRates = async () => {
      try {
        const response = await api.get('/reservation/requestAllCourtRates/');
        setAllCourtRates(response.data)
      } catch (error) {
        console.error("Failed to fetch court Rates:", error);
        setFetchError('Failed to load court Rates. Please try again.');
      }
    };
  
    fetchUser();
    fetchFacilities();
    fetchCourts();
    fetchCourtRates();
  }, []);  

  const handlePhoneNumber = (event) => {
    const { value } = event.target;
    if (/^\d*$/.test(value)) {
      setPhoneNumber(value);

      if (value.length === 10) {
        setPhoneNumberError('');
      } else {
        setPhoneNumberError('Phone number must be exactly 10 digits');
      }
    }
  };

  const handleBooleanChange = (event) => {
    const { name, checked } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handleRequirementChange = (event) => {
    setRequirement(event.target.value);
  };

  const handleFacilityChange = (event) => {
    const selected = event.target.value;
    console.log("Selected Facility:", selected);
  
    if (selected !== selectedFacility) {
      setSelectedFacility(selected);
  
      const selectedFacilityObject = facilities.find(
        (facility) => facility.facility_name.toLowerCase() === selected.toLowerCase()
      );
  
      if (selectedFacilityObject) {
        const facilityId = selectedFacilityObject.facility_id;
  
        // Filter courts based on the matching facility_id
        const filtered = allCourts.filter((court) => court.facility === facilityId);
        console.log("Filtered Courts:", filtered);
        setFilteredCourts(filtered);
      } else {
        console.warn("No matching facility found for the selected name.");
        setFilteredCourts([]);
      }
    }
  };

  
  const handleCourtChange = async (event) => {
    const selectedCourtName = event.target.value;
    setCourt(selectedCourtName);
    console.log("court change being handled")
 
    const selectedCourtObject = filteredCourts.find(
      (court) => court.court_name === selectedCourtName
    );
  
    if (selectedCourtObject) {
      const facilityId = facilities.find(
        (facility) => facility.facility_name === selectedFacility
      )?.facility_id;
  
      if (selectedCourtObject) {
        const numCourts = selectedCourtObject.num_of_courts || 1; 
        setNumOfCourts("");
        setMaxCourts(numCourts); 

        const filteredRates = allCourtRates.filter(
          (rate) => rate.court.court_id === selectedCourtObject.court_id
        );
    
        const uniqueActivities = [
          ...new Set(filteredRates.map((rate) => rate.activity)),
        ];
    
        setFilteredActivities(uniqueActivities);
      } else {
        console.warn("No matching court found.");
        setMaxCourts(1); 
        setFilteredActivities([]); 
      }
  
      // Fetch booked slots from the backend
      try {
        const response = await api.get(`/reservation/requestReservationsByCourt/${selectedFacility}/${selectedCourtName}/`);
        setBookedSlots(response.data);
        console.log(response)
      } catch (error) {
        console.error("Failed to fetch booked slots:", error);
      }
    }
  };
  
  

  const handleNumOfCourtsChange = (event) => {
    const value = parseInt(event.target.value, 10);
  
    if (!maxCourts) {
      setNumOfCourtsError("No court selected or maximum courts unavailable.");
      return;
    }
  
    if (value >= 0 && value <= maxCourts) {
      setNumOfCourts(value);
      setNumOfCourtsError("");
    } else {
      setNumOfCourtsError(`The maximum number of courts available is ${maxCourts}.`);
    }
  };
  


  const handleActivityChange = (event) => {
    const selectedActivity = event.target.value;
    setActivity(selectedActivity);
  
    // Find the selected court object
    const selectedCourtObject = filteredCourts.find(
      (courtItem) => courtItem.court_name === court
    );
  
    if (selectedCourtObject) {
      console.log("Selected Court ID:", selectedCourtObject.court_id);
  
      // Filter court rates based on selected court and activity
      const filteredRates = allCourtRates.filter(
        (rate) =>
          rate.court.court_id === selectedCourtObject.court_id &&
          rate.activity === selectedActivity
      );
  
      console.log("Filtered Rates:", filteredRates);
  
      // Extract unique durations
      const uniqueDurations = [
        ...new Set(filteredRates.map((rate) => rate.duration)),
      ];
  
      console.log("Unique Durations:", uniqueDurations);
  
      // Determine which rate types to display
      const availableRateTypes = [];
      if (
        uniqueDurations.includes("per full day") ||
        uniqueDurations.includes("per half day")
      ) {
        availableRateTypes.push("day_rate");
      }
      if (uniqueDurations.includes("per hour")) {
        availableRateTypes.push("hourly_rate");
      }
  
      setFilteredRateTypes(availableRateTypes);
      console.log("Available Rate Types:", availableRateTypes);
    } else {
      console.warn("No matching court found for the selected activity.");
      setFilteredRateTypes([]);
    }
  };
  
  

  const handleRateTypeChange = (e) => {
    setRateType(e.target.value);
    setTableData([]);
  };

  const handleNumOfParticipantsChange = (event) => {
    const value = event.target.value;
    if (value >= 0 && value <= 20) {
      setNumOfParticipants(value);

      const newParticipantsData = [];
      for (let i = 0; i < value; i++) {
        newParticipantsData.push({ name: '', nic: '' });
      }
      setParticipantsData(newParticipantsData);
    }
  };

  const handleParticipantChange = (index, field, value) => {
    const updatedParticipants = [...participantsData];
  
    updatedParticipants[index][field] = value;
    setParticipantsData(updatedParticipants);
  };


  const validTimes = [
    "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
    "06:00 PM", "07:00 PM", "08:00 PM"
  ];

  const handleAddRow = () => {
    if (rateType === 'hourly_rate') {
      setTableData([...tableData, { date: null, startTime: validTimes[0], endTime: validTimes[1], amount: '' }]);
    } else {
      setTableData([...tableData, { date: null, durationType: 'full_day', amount: '' }]);
    }
  };
  
  // const calculateAmount = (row, rateType, filteredCourts, court, activity, allCourtRates) => {
  //   if (rateType === "hourly_rate" && row.startTime && row.endTime) {
  //     const startHour = parseInt(row.startTime.split(":"), 10);
  //     const endHour = parseInt(row.endTime.split(":"), 10);
  
  //     if (endHour > startHour) {
  //       const selectedCourtObject = filteredCourts.find(
  //         (courtItem) => courtItem.court_name === court
  //       );
  
  //       if (selectedCourtObject) {
  //         const filteredRates = allCourtRates.filter(
  //           (rate) =>
  //             rate.court.court_id === selectedCourtObject.court_id &&
  //             rate.activity === activity &&
  //             rate.duration === "per hour"
  //         );
  
  //         if (filteredRates.length > 0) {
  //           const rate = filteredRates[0].rate;
  //           const hours = endHour - startHour;
  //           return (rate * hours).toFixed(2);
  //         }
  //       }
  //     }
  //     return ""; // Return empty if validation fails
  //   }
  
  //   if (rateType === "day_rate" && row.durationType) {
  //     const selectedCourtObject = filteredCourts.find(
  //       (courtItem) => courtItem.court_name === court
  //     );
  
  //     if (selectedCourtObject) {
  //       const filteredRates = allCourtRates.filter(
  //         (rate) =>
  //           rate.court.court_id === selectedCourtObject.court_id &&
  //           rate.activity === activity &&
  //           rate.duration ===
  //             (row.durationType === "full_day" ? "per full day" : "per half day")
  //       );
  
  //       if (filteredRates.length > 0) {
  //         return filteredRates[0].rate.toFixed(2);
  //       }
  //     }
  //   }
  
  //   return ""; // Default empty string if no conditions are met
  // };

  // Updated handleRowChange method

  const calculateAmount = (row, rateType, filteredCourts, court, activity, allCourtRates) => {
    console.log("Calculating amount for row:", row); 
    console.log("Rate Type:", rateType); 
  
    if (rateType === "hourly_rate" && row.startTime && row.endTime) {
      const startMinutes = parseTime(row.startTime).getHours() * 60 + parseTime(row.startTime).getMinutes();
      const endMinutes = parseTime(row.endTime).getHours() * 60 + parseTime(row.endTime).getMinutes();
      const durationHours = (endMinutes - startMinutes) / 60;
  
      if (durationHours > 0) {
        const selectedCourtObject = filteredCourts.find((courtItem) => courtItem.court_name === court);
  
        if (selectedCourtObject) {
          const filteredRates = allCourtRates.filter(
            (rate) =>
              rate.court.court_id === selectedCourtObject.court_id &&
              rate.activity === activity &&
              rate.duration === "per hour"
          );
  
          if (filteredRates.length > 0) {
            const rate = filteredRates[0].rate;
            const totalAmount = rate * durationHours;
            console.log("Calculated Amount (Hourly):", totalAmount); 
            return totalAmount.toFixed(2);
          }
        }
      }
      return "";
    }
  
    if (rateType === "day_rate" && row.durationType) {
      const selectedCourtObject = filteredCourts.find((courtItem) => courtItem.court_name === court);
  
      if (selectedCourtObject) {
        const filteredRates = allCourtRates.filter(
          (rate) =>
            rate.court.court_id === selectedCourtObject.court_id &&
            rate.activity === activity &&
            rate.duration === (row.durationType === "full_day" ? "per full day" : "per half day")
        );
  
        if (filteredRates.length > 0) {
          const rate = filteredRates[0].rate;
          console.log("Calculated Amount (Day Rate):", rate);
          return rate.toFixed(2);
        }
      }
    }
  
    return ""; 
  };
  

  const handleRowChange = (index, key, value) => {
  const updatedData = [...tableData];
  updatedData[index][key] = value;

  // Recalculate the amount when relevant fields are changed
  if (
    (rateType === "hourly_rate" && (key === "startTime" || key === "endTime")) ||
    (rateType === "day_rate" && key === "durationType")
  ) {
    updatedData[index].amount = calculateAmount(
      updatedData[index],
      rateType,
      filteredCourts,
      court,
      activity,
      allCourtRates
    );
  }

  setTableData(updatedData);
};
  

  const getEligibleDate = () => {
    const today = new Date();
    let count = 0;
    let eligibleDate = new Date(today);

    while (count < 7) {
      eligibleDate.setDate(eligibleDate.getDate() + 1);
      if (eligibleDate.getDay() !== 0 && eligibleDate.getDay() !== 6) {
        count++;
      }
    }
    return eligibleDate;
  };
  
  const parseTime = (timeString) => {
    const [time, modifier] = timeString.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
  
    if (modifier === "PM" && hours !== 12) {
      hours += 12;
    }
    if (modifier === "AM" && hours === 12) {
      hours = 0;
    }
  
    return new Date(1970, 0, 1, hours, minutes, 0); // A valid Date object
  };
  
  
// ----------------------------------------------------------
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const formattedTableData = tableData.map((row) => {
      const formattedRow = {
        date: row.date ? new Date(row.date).toISOString().split("T")[0] : null, 
      };
  
      if (rateType === "hourly_rate") {
        // Function to format time to HH:MM:SS (24-hour format)
        const formatTime = (time) => {
          if (!time) return null; 
  
          const timeParts = time
            .replace(" AM:00", "")
            .replace(" PM:00", "")
            .replace(" AM", "")
            .replace(" PM", "")
            .trim();
  
          const parsedTime = new Date(`1970-01-01T${timeParts}:00`);
          const hours = parsedTime.getHours().toString().padStart(2, "0");
          const minutes = parsedTime.getMinutes().toString().padStart(2, "0");
          const seconds = "00"; 
          return `${hours}:${minutes}:${seconds}`;
        };
  
        return {
          ...formattedRow,
          start_time: formatTime(row.startTime), 
          end_time: formatTime(row.endTime), 
        };
      } else if (rateType === "day_rate") {
        return {
          ...formattedRow,
          duration_type: row.durationType || null, 
        };
      }
  
      return formattedRow; 
    });
  
    const is_school = formState.isSchool;
    const is_gov = formState.isGovernment;
    const is_foreign = formState.isForeign;
    const is_competitive = formState.isCompetitive;
    const is_pdn = formState.isUOPUndergraduate;
  
    const formData = {
      email,
      activity,
      rate_type: rateType,
      num_of_courts: numOfCourts,
      user,
      requirement,
      is_school,
      is_gov,
      is_foreign,
      is_competitive,
      org_name: teamName,
      is_pdn,
      num_of_participants: numOfParticipants,
      address,
      phoneNumber,
      facility_name: selectedFacility,
      court_name: court,
      numOfParticipants,
      dates: formattedTableData,
    };
  
    console.log(JSON.stringify(formData, null, 2));

    
    setApplicantName('');
    setEmail('');
    setTeamName('');
    setAddress('');
    setPhoneNumber('');
    setRequirement('');
    setSelectedFacility('');
    setCourt('');
    setNumOfCourts('');
    setActivity('');
    setRateType('hourly_rate');
    setNumOfParticipants('');
    setParticipantsData([]);
    setTableData([]);
    setFormState({
    isSchool: false,
    isGovernment: false,
    isForeign: false,
    isCompetitive: false,
    isUOPUndergraduate: false,
  });
  
    try {
      // const response = await api.post(
      //   "/reservation/addReservationRequest/",
      //   JSON.stringify(formData, null, 2)
      // );



      const response = await api.post('/reservation/addReservationRequest/', formData, {
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${authToken}`,
        },
      });
  
      if (response.status === 200 || response.status === 201) {
        console.log(
          "Reservation request submitted successfully:",
          response.data
        );
        alert("Reservation request submitted successfully!");
      } else {
        console.error("Failed to submit the reservation request:", response);
        alert("Failed to submit the reservation request. Please try again.");
      }
    } catch (error) {
      console.error(
        "An error occurred while submitting the reservation request:",
        error
      );
      alert("An error occurred. Please try again later.");
    }
  
    onClose();
    navigate("/reservations");
  };
  
  

  if (!isOpen) return null;
// ----------------------------------------------------------
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl h-full max-h-[90vh] overflow-y-auto p-6 rounded-lg shadow-lg">
        <div className="flex flex-col justify-between mb-4">
          <div className="flex flex-row justify-between mb-4 w-full">
            <h2 className="text-xl font-semibold">Reservations</h2>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-900"
            >
              &times;
            </button>
          </div>
          <div className='flex form-holder flex-col gap-4'>
            <form onSubmit={handleSubmit}>
              <div className='name flex flex-col gap-2 mb-2'>
                <label className="block font-medium">Applicant Name</label>
                <div className='flex flex-row'>
                  <input
                    type="text"
                    name="applicantName"
                    className="p-2 border w-full border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                  />
                </div>
              </div>

              <div className='email flex flex-col gap-2 mb-2'>
                <label className="block font-medium">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
                {emailError && <span className="text-red-500">{emailError}</span>}
              </div>

              <div className='team-name flex flex-col gap-2 mb-2'>
                <label className="block font-medium">Team/Organization Name</label>
                <input
                  type="text"
                  name="teamName"
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  required
                />
              </div>

              <div className='address flex flex-col gap-2 mb-2'>
                <label className="block font-medium">Address</label>
                <input
                  type="text"
                  name="address"
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              <div className='contact flex flex-col gap-2 mb-2'>
                <label className="block font-medium">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={handlePhoneNumber}
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
                {phoneNumberError && <span className="text-red-500">{phoneNumberError}</span>}
              </div>

              <div className='requirement flex flex-col gap-2 mb-2'>
                <label className="block font-medium">Requirement</label>
                <input
                  type="text"
                  name="requirement"
                  value={requirement}
                  onChange={handleRequirementChange} // Use the separate handler
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>


              <div className=" facility mb-2">
                <label className="block font-medium">Facility</label>
                <select
                  name="facility"
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  value={selectedFacility}
                  onChange={handleFacilityChange}
                  required
                >
                  {facilities.map((facility) => (
                    <option key={facility.facility_id} value={facility.facility_name}>
                      {facility.facility_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className='court mb-2'>
                <label className="block font-medium">Required Court</label>
                <select
                  name="court"
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  value={court}
                  onChange={handleCourtChange}
                  required
                >
                  {filteredCourts.map((court) => (
                    <option key={court.court_id} value={court.court_name}>
                      {court.court_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="numOfCourts flex flex-col gap-2 mb-2">
                <label className="block font-medium">Number of courts</label>
                <input
                  type="number"
                  name="numOfCourts"
                  value={numOfCourts}
                  onChange={handleNumOfCourtsChange}
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
                {numOfCourtsError && <span className="text-red-500">{numOfCourtsError}</span>}
              </div>

              <div className='activity flex flex-col gap-2 mb-2'>
                <label className="block font-medium">Activity</label>
                <select
                  name="activity"
                  value={activity}
                  onChange={handleActivityChange}
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  disabled={filteredActivities.length === 0}
                  required
                >
                  <option value=""> </option>
                  {filteredActivities.map((activity, index) => (
                    <option key={index} value={activity}>
                      {activity}
                    </option>
                  ))}
                </select>
              </div>

              <div className="rateType flex items-center space-x-4 mb-4">
                <label htmlFor="rateType" className="block font-medium">
                  Rate Type:
                </label>
                <select
                  id="rateType"
                  name="rateType"
                  value={rateType}
                  onChange={handleRateTypeChange}
                  className="border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2"
                  disabled={filteredRateTypes.length === 0} 
                  required
                >
                  <option value="">Select Rate Type</option>
                  {filteredRateTypes.map((type, index) => (
                    <option key={index} value={type}>
                      {type === "hourly_rate" ? "Hourly Rate" : "Day Rate"}
                    </option>
                  ))}
                </select>
                {filteredRateTypes.length === 0 && (
                  <span className="text-red-500 text-sm">
                    No rate types available for this selection.
                  </span>
                )}
              </div>

              <div className="ifCheckboxes flex flex-col gap-2 mb-4">
                <label className="block font-medium">Select if yes</label>
                <label className="isSchool flex items-center justify-between">
                  <span className="mr-2">Are you a Government school?</span>
                  <input
                    type="checkbox"
                    name="isSchool"
                    checked={formState.isSchool}
                    onChange={handleBooleanChange}
                    className="w-4 h-4"
                  />
                </label>

                <label className="isGovernment flex items-center justify-between">
                  <span className="mr-2">Are you a Government Organization?</span>
                  <input
                    type="checkbox"
                    name="isGovernment"
                    checked={formState.isGovernment}
                    onChange={handleBooleanChange}
                    className="w-4 h-4"
                  />
                </label>

                <label className="isForeign flex items-center justify-between">
                  <span className="mr-2">Are you a foreign national?</span>
                  <input
                    type="checkbox"
                    name="isForeign"
                    checked={formState.isForeign}
                    onChange={handleBooleanChange}
                    className="w-4 h-4"
                  />
                </label>

                <label className="isCompetitive flex items-center justify-between">
                  <span className="mr-2">Is the event Competitive?</span>
                  <input
                    type="checkbox"
                    name="isCompetitive"
                    checked={formState.isCompetitive}
                    onChange={handleBooleanChange}
                    className="w-4 h-4"
                  />
                </label>

                <label className="isUOPUndergraduate flex items-center justify-between">
                  <span className="mr-2">Are you a UOP Undergraduate?</span>
                  <input
                    type="checkbox"
                    name="isUOPUndergraduate"
                    checked={formState.isUOPUndergraduate}
                    onChange={handleBooleanChange}
                    className="w-4 h-4"
                  />
                </label>
              </div>

  
              <div className='numOfParticipants flex flex-col gap-2 mb-2'>
                <label className="block font-medium">Number of Participants</label>
                <input
                  type="number"
                  name="numOfParticipants"
                  value={numOfParticipants}
                  onChange={handleNumOfParticipantsChange}
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              {/* Participants Details */}
              {/* {participantsData.map((participant, index) => (
                <div key={index} className="participant mb-2">
                  <label className="block font-medium">Participant {index + 1}</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Name"
                      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                      value={participant.name}
                      onChange={(e) => handleParticipantChange(index, 'name', e.target.value)}
                      required
                    />
                    <input
                      type="text"
                      placeholder="NIC"
                      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                      value={participant.nic}
                      onChange={(e) => handleParticipantChange(index, 'nic', e.target.value)}
                      required
                    />
                  </div>
                </div>
              ))} */}

              {/* ---------date table----------- */}
              <table className="min-w-full divide-y divide-gray-200 border mt-4">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Date
                    </th>
                    {rateType === 'hourly_rate' && (
                      <>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Start Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          End Time
                        </th>
                      </>
                    )}
                    {rateType === 'day_rate' && (
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Duration Type
                      </th>
                    )}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tableData.map((row, index) => (
                    <tr key={index}>
                      {/* Date Column */}
                      <td className="px-6 py-4 whitespace-nowrap">
                      <DatePicker
                        selected={row.date}
                        onChange={(date) => {
                          const normalizedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()); // Set time to local midnight
                          handleRowChange(index, 'date', normalizedDate);
                        }}
                        filterDate={(date) =>
                          date >= getEligibleDate() && date.getDay() !== 0 && date.getDay() !== 6
                        }
                        dateFormat="yyyy-MM-dd"
                        className="border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                      </td>

                      {/* Start Time and End Time Columns */}
                      {rateType === 'hourly_rate' && (
                        <>
                          <td className="px-6 py-4 whitespace-nowrap">                            
                          <select
                            value={row.startTime}
                            onChange={(e) => handleRowChange(index, "startTime", e.target.value)}
                            className="border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          >
                            {validTimes.map((time) => {
                              const isDisabled = bookedSlots.some((slot) => {
                                const isSameDate = slot.date === row.date?.toLocaleDateString("en-CA"); // Outputs the date in "YYYY-MM-DD" format

                                const selectedTime = parseTime(time);
                                const bookedStartTime = parseTime(slot.start_time);
                                const bookedEndTime = parseTime(slot.end_time);
                                // console.log(selectedTime, bookedStartTime, bookedEndTime)
                                
                                return isSameDate && selectedTime >= bookedStartTime && selectedTime < bookedEndTime;
                              });

                              return (
                                <option key={time} value={time} disabled={isDisabled}>
                                  {time}
                                </option>
                              );
                            })}
                          </select>

                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={row.endTime}
                            onChange={(e) => handleRowChange(index, 'endTime', e.target.value)}
                            className="border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          >
                            {validTimes.map((time) => {
                              const isDisabled = bookedSlots.some((slot) => {
                                const isSameDate = slot.date === row.date?.toLocaleDateString("en-CA"); // Ensure the same date
                                const selectedTime = parseTime(time);
                                const bookedStartTime = parseTime(slot.start_time);
                                const bookedEndTime = parseTime(slot.end_time);
                              
                                // Overlapping with booked slots
                                const overlaps = isSameDate && selectedTime > bookedStartTime && selectedTime <= bookedEndTime;
                              
                                return overlaps;
                              }) || parseTime(time) <= parseTime(row.startTime);
                              return (
                                <option key={time} value={time} disabled={isDisabled}>
                                  {time}
                                </option>
                              );
                            })}
                          </select>
                          </td>
                        </>
                      )}

                      {/* Duration Type Column */}
                      {rateType === 'day_rate' && (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={row.durationType}
                            onChange={(e) => handleRowChange(index, 'durationType', e.target.value)}
                            className="border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          >
                            {["full_day", "half_day"].map((type) => {
                              const isDisabled = bookedSlots.some((slot) => {
                                if (slot.date === (row.date?.toLocaleDateString("en-CA"))) {
                                  if (type === "full_day") {
                                    return true; 
                                  }
                                  if (type === "half_day") {
                                    const bookedStart = new Date(`1970-01-01T${slot.start_time}`);
                                    const bookedEnd = new Date(`1970-01-01T${slot.end_time}`);
                                    return bookedStart < new Date(`1970-01-01T12:00 PM`) && bookedEnd > new Date(`1970-01-01T04:00 PM`);
                                  }
                                }
                                return false;
                              });

                              return (
                                <option key={type} value={type} disabled={isDisabled}>
                                  {type === "full_day" ? "Full Day" : "Half Day"}
                                </option>
                              );
                            })}
                          </select>

                        </td>
                      )}
                       <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="number"
                          step="0.01" 
                          value={row.amount}
                          onChange={(e) => handleRowChange(index, 'amount', e.target.value)}
                          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                       </td>

                    </tr>
                  ))}
                </tbody>
              </table>


              <div className="dateTableButton">
                <button
                  type="button"
                  onClick={handleAddRow}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-500  mt-4 mb-4"
                >
                  Add Row
                </button>
              </div>

              <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
