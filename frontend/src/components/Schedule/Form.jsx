import React, { useState } from 'react';

const Form = ({ isOpen, onClose }) => {
  const [selectedRequirement, setSelectedRequirement] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [numOfParticipants, setNumOfParticipants] = useState('');
  const [participantsData, setParticipantsData] = useState([]);
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("09:00");

  // List of courts
  const gymCourts = [
    'Whole Gym', 'Badminton', 'Basketball', 'Boxing', 'Carrom', 'Chess', 'Karate', 'Netball',
    'Power Lifting', 'Table Tennis', 'Taekwondo', 'Volleyball', 'Weightlifting',
    'Wrestling', 'Wushu'
  ];

  const groundCourts = [
    'Baseball', 'Basketball', 'Cricket (hard ball)', 'Elle', 'Football', 'Hockey',
    'Netball', 'Rugger', 'Tennis', 'Track and Field', 'Volleyball'
  ];

  const poolCourts = ['Full Pool', 'Half the Pool'];

  const handlePhoneNumber = (event) => {
    const { value } = event.target;
    if (/^\d*$/.test(value)) {
      setPhoneNumber(value);
    }
  };

  const handleRequirementChange = (event) => {
    setSelectedRequirement(event.target.value);
  };

  // Check the required area and set the courts 
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
    return twoWeeksLater.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
  };

  const handleNumOfParticipantsChange = (event) => {
    const value = event.target.value;
    if (value >= 0 && value <= 20) {
      setNumOfParticipants(value);

      // Update participants data array
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
  
    // Ensure end time is later than start time
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
            <form className="" action="">

              <div className='name flex flex-col gap-2 mb-2'>
                <label className="block font-medium">Applicant Name</label>
                <div className='flex flex-row' >
                <select
                  name="m"
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
                  required
                />
                </div>
              </div>

              <div className='team-name flex flex-col gap-2 mb-2'>
                <label className="block font-medium">Team/Organization Name</label>
                <input
                  type="text"
                  name="teamName"
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className='address flex flex-col gap-2 mb-2'>
                <label className="block font-medium">Address</label>
                <input
                  type="text"
                  name="address"
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className='phone-num flex flex-col gap-2 mb-2'>
                <label className="block font-medium">Telephone Number</label>
                <input
                  id="phone-number"
                  type="text"
                  value={phoneNumber}
                  onChange={handlePhoneNumber}
                  maxLength="10"
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className='required-area flex flex-col gap-2 mb-2'>
                <label className="block font-medium">Required Area</label>
                <select
                  name="requirement"
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  value={selectedRequirement}
                  onChange={handleRequirementChange}
                  required
                >
                  <option value="-"></option>
                  <option value="ground">Ground</option>
                  <option value="gym">Gym</option>
                  <option value="pool">Pool</option>
                </select>
              </div>

              <div className='required-court flex flex-col gap-2 mb-2'>
                <label className="block font-medium">Required Court</label>
                <select
                  name="requiredCourt"
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  required
                >
                  <option value="-"></option>
                  {requiredCourts.map((court, index) => (
                    <option key={index} value={court.toLowerCase().replace(/\s+/g, '-')}>
                      {court}
                    </option>
                  ))}
                </select>
              </div>

              <div className='usageType flex flex-col gap-2 mb-2'>
                <label className="block mb-1 font-medium">Usage Type</label>
                <select
                  name="usageType"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                >
                  <option value="-"></option>
                  <option value="Practice">Practice</option>
                  <option value="Competition">Competition</option>
                </select>
              </div>

              <div className='date flex flex-col gap-2 mb-2'>
                <label className="block mb-1 font-medium">Date</label>
                <input
                  type="date"
                  name="date"
                  min={getTwoWeeksLaterDate()}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="start-time flex flex-col gap-2 mb-2">
                    <label className="block font-medium">Start Time</label>
                    <select
                        name="startTime"
                        value={startTime}
                        onChange={handleStartTimeChange}
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    >
                        <option value=""></option>
                        {timeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                        ))}
                    </select>
                    </div>

                    <div className="end-time flex flex-col gap-2 mb-2">
                    <label className="block font-medium">End Time</label>
                    <select
                        name="endTime"
                        value={endTime}
                        onChange={handleEndTimeChange}
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    >
                        <option value=""></option>
                        {timeOptions
                        .filter((option) => option.value > startTime)
                        .map((option) => (
                            <option key={option.value} value={option.value}>
                            {option.label}
                            </option>
                        ))}
                    </select>
                </div>

              <div className='numOfParticipants flex flex-col gap-2 mb-2'>
                <label className="block font-medium">Number of Participants</label>
                <input
                  type="number"
                  name="numberOfParticipants"
                  min="0"
                  max="20"
                  value={numOfParticipants}
                  onChange={handleNumOfParticipantsChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className='participantData flex flex-col gap-2 mb-2'>
                <label className="block font-medium">Data of Participants</label>
                {participantsData.length > 0 && (
                  <table className="min-w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="border p-2 text-left">#</th>
                        <th className="border p-2 text-left">Name</th>
                        <th className="border p-2 text-left">NIC</th>
                      </tr>
                    </thead>
                    <tbody>
                      {participantsData.map((participant, index) => (
                        <tr key={index}>
                          <td className="border p-2">{index + 1}</td>
                          <td className="border p-2">
                            <input
                              type="text"
                              value={participant.name}
                              onChange={(e) =>
                                handleParticipantChange(index, 'name', e.target.value)
                              }
                              className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                              required
                            />
                          </td>
                          <td className="border p-2">
                            <input
                              type="text"
                              value={participant.nic}
                              onChange={(e) =>
                                handleParticipantChange(index, 'nic', e.target.value)
                              }
                              className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                              required
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                </div>


            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
