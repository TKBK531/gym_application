import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Form = ({ isOpen, onClose }) => {
  const [selectedRequirement, setSelectedRequirement] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [numOfParticipants, setNumOfParticipants] = useState('');
  const [participantsData, setParticipantsData] = useState([]);
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("09:00");
  const [applicantName, setApplicantName] = useState('');
  const [teamName, setTeamName] = useState('');
  const [address, setAddress] = useState('');
  const [court, setCourt] = useState('');
  const [requiredDate, setRequiredDate] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');

  const navigate = useNavigate();

  const gymCourts = ['Whole Gym', 'Badminton', 'Basketball', 'Boxing', 'Carrom', 'Chess', 'Karate', 'Netball', 'Power Lifting', 'Table Tennis', 'Taekwondo', 'Volleyball', 'Weightlifting', 'Wrestling', 'Wushu'];
  const groundCourts = ['Baseball', 'Basketball', 'Cricket (hard ball)', 'Elle', 'Football', 'Hockey', 'Netball', 'Rugger', 'Tennis', 'Track and Field', 'Volleyball'];
  const poolCourts = ['Full Pool', 'Half the Pool'];

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
    setSelectedRequirement(event.target.value);
  };

  let requiredCourts = [];
  if (selectedRequirement === 'gym') {
    requiredCourts = gymCourts;
  } else if (selectedRequirement === 'ground') {
    requiredCourts = groundCourts;
  } else if (selectedRequirement === 'pool') {
    requiredCourts = poolCourts;
  }

  const getTwoWeeksLaterDate = () => {
    const today = new Date();
    const twoWeeksLater = new Date(today.setDate(today.getDate() + 14));
    return twoWeeksLater.toISOString().split('T')[0];
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

  const timeOptions = [
    { value: "08:00", label: "8 AM" },
    { value: "09:00", label: "9 AM" },
    { value: "10:00", label: "10 AM" },
    { value: "11:00", label: "11 AM" },
    { value: "12:00", label: "12 PM" },
    { value: "13:00", label: "1 PM" },
    { value: "14:00", label: "2 PM" },
    { value: "15:00", label: "3 PM" },
    { value: "16:00", label: "4 PM" },
    { value: "17:00", label: "5 PM" },
    { value: "18:00", label: "6 PM" },
    { value: "19:00", label: "7 PM" },
    { value: "20:00", label: "8 PM" },
    { value: "21:00", label: "9 PM" },
  ];

  const handleStartTimeChange = (event) => {
    const newStartTime = event.target.value;
    setStartTime(newStartTime);
    if (newStartTime >= endTime) {
      const newEndTimeIndex = timeOptions.findIndex(
        (option) => option.value === newStartTime
      );
      setEndTime(timeOptions[newEndTimeIndex + 1]?.value || newStartTime);
    }
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      applicantName,
      email,
      teamName,
      address,
      phoneNumber,
      selectedRequirement,
      court,
      numOfParticipants,
      participantsData,
      requiredDate,
      startTime,
      endTime,
    };

    console.log('Form Data:', formData); // Logs the object directly
    console.log('Form Data as JSON:', JSON.stringify(formData, null, 2)); // Logs the JSON stringified version

    // Close the form modal
    onClose();

    // Navigate to the reservation page (replace '/reservations' with your desired route)
    navigate('/reservations');
  };

  if (!isOpen) return null;

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
                  <select
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    required
                  >
                    <option value="-"></option>
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Miss">Miss</option>
                    <option value="Rev.">Rev.</option>
                  </select>
                  <input
                    type="text"
                    name="applicantName"
                    className="p-2 border w-full border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    required
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


              {/* Additional fields */}
              <div className='mb-2'>
                <label className="block font-medium">Required Facility</label>
                <select
                  name="requirement"
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  value={selectedRequirement}
                  onChange={handleRequirementChange}
                  required
                >
                  <option value=""></option>
                  <option value="gym">Gym</option>
                  <option value="ground">Ground</option>
                  <option value="pool">Pool</option>
                </select>
              </div>

              <div className='mb-2'>
                <label className="block font-medium">Required Court</label>
                <select
                  name="court"
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  value={court}
                  onChange={(e) => setCourt(e.target.value)}
                  required
                >
                  <option value="-"></option>
                  {requiredCourts.map((court, index) => (
                    <option key={index} value={court}>{court}</option>
                  ))}
                </select>
              </div>

              <div className='participants flex flex-col gap-2 mb-2'>
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
              {participantsData.map((participant, index) => (
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
              ))}

              <div className='required-date flex flex-col gap-2 mb-2'>
                <label className="block font-medium">Required Date</label>
                <input
                  type="date"
                  name="requiredDate"
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  value={requiredDate}
                  onChange={(e) => setRequiredDate(e.target.value)}
                  min={getTwoWeeksLaterDate()}
                  required
                />
              </div>

              <div className='required-time flex flex-col gap-2 mb-2'>
                <label className="block font-medium">Required Time</label>
                <div className="flex gap-2">
                  <select
                    name="startTime"
                    value={startTime}
                    onChange={handleStartTimeChange}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    required
                  >
                    {timeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  <select
                    name="endTime"
                    value={endTime}
                    onChange={handleEndTimeChange}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    required
                  >
                    {timeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
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
