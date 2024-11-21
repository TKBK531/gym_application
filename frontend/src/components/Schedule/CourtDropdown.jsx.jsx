import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import React, { useState } from 'react';

export const CourtDropdown = () => {
  const facilities = ["Gym", "Ground", "Pool"];
  const gymCourts = [
    'Badminton', 'Basketball', 'Boxing', 'Carrom', 'Chess', 'Karate',
    'Netball', 'Power Lifting', 'Table Tennis', 'Taekwondo',
    'Volleyball', 'Weightlifting', 'Wrestling', 'Wushu'
  ];
  const groundCourts = [
    'Baseball', 'Basketball', 'Cricket (hard ball)', 'Elle', 'Football',
    'Hockey', 'Netball', 'Rugger', 'Tennis', 'Track and Field', 'Volleyball'
  ];

  const [selectedFacility, setSelectedFacility] = useState('Facility');
  const [selectedCourt, setSelectedCourt] = useState('Court');

  const handleFacilitySelection = (facility) => {
    setSelectedFacility(facility);
    setSelectedCourt('Court');
  };

  const handleCourtSelection = (court) => {
    setSelectedCourt(court);
  };

  const availableCourts = selectedFacility === "Gym" ? gymCourts :
    selectedFacility === "Ground" ? groundCourts : [];

  return (
    <div className="sport-picker-today-holder flex flex-row ">

      {/* Facility Menu */}
      <Menu as="div" className="relative inline-block text-left my-1 ">
        <MenuButton className="inline-flex w-full justify-center  gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {selectedFacility}
          <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
        </MenuButton>
        <MenuItems
          transition
          className="absolute mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none">
          <div className="py-1">
            {facilities.map((facility, index) => (
              <MenuItem key={facility}>
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  onClick={() => handleFacilitySelection(facility)}
                >
                  {facility}
                </button>
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Menu>

      {/* Court Menu */}
      <Menu as="div" className={`relative inline-block text-left mx-4 my-1 ${selectedFacility === "Pool" && "opacity-50 pointer-events-none"}`}>
        <MenuButton className="inline-flex w-full justify-center  gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" disabled={selectedFacility === "Pool"}>
          {selectedCourt}
          <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
        </MenuButton>
        {selectedFacility !== "Pool" && (
          <MenuItems
            transition
            className="absolute mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none max-h-60 overflow-y-auto">
            <div className="py-1">
              {availableCourts.map((court) => (
                <MenuItem key={court}>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    onClick={() => handleCourtSelection(court)}
                  >
                    {court}
                  </button>
                </MenuItem>
              ))}
            </div>
          </MenuItems>
        )}
      </Menu>
    </div>
  );
};
