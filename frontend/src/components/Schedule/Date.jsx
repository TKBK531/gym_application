import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import dayjs from 'dayjs';

export default function Date({ onDateChange, selectedDate }) {
  const handleDateChange = (newValue) => {
    console.log("Raw value from DatePicker:", newValue); // Debug log

    if (newValue && dayjs(newValue).isValid()) {
      const formattedDate = dayjs(newValue).format('MM/DD/YYYY'); // Format as MM/DD/YYYY
      console.log("Formatted date sent to parent:", formattedDate); // Debug log
      onDateChange(formattedDate); // Notify the parent
    } else {
      console.error("Invalid date selected:", newValue);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Select Date"
        value={selectedDate ? dayjs(selectedDate) : null} 
        onChange={handleDateChange} 
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
