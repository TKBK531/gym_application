import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Stack, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

export default function WeekPicker() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [weekRange, setWeekRange] = useState('');

  // Function to format the date (Day Month)
  const formatDateToString = (date) => {
    return dayjs(date).format('DD MMM'); // E.g., 01 Jan
  };

  // Handle date change and set the week starting from the selected date
  const handleDateChange = (newValue) => {
    if (newValue) {
      const startOfWeek = newValue; // Set the selected date as the start of the week
      setSelectedDate(startOfWeek); // Store the selected date

      const endOfWeek = startOfWeek.add(6, 'day'); // Calculate the end of the week
      const formattedRange = `${formatDateToString(startOfWeek)} - ${formatDateToString(endOfWeek)}`;
      setWeekRange(formattedRange); // Update the week range
    } else {
      setSelectedDate(null);
      setWeekRange('');
    }
  };

  return (
    <div className="flex flex-row-reverse items-center pt-5 pb-8 w-full ml-3">
      {/* Stylish week range display */}
      <div className="text-lg text-right rounded-lg p-2 flex-end w-4/6 ">
        {weekRange}
      </div>

      <div className="flex-1 pt-1">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack spacing={2}>
            <DatePicker
              label="Select Start of Week"
              renderInput={(params) => <TextField {...params} sx={{ width: '200px' }} />}
              slotProps={{ textField: { size: 'small'} }}
              value={selectedDate}
              onChange={handleDateChange}
            />
          </Stack>
        </LocalizationProvider>
      </div>
    </div>
  );
}
