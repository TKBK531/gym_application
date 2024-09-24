import React,{useState} from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Stack, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs';




export default function Date() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [formattedDate, setFormattedDate] = useState('');

  // Function to format the date
  const formatDateToString = (date) => {
    return dayjs(date).format('YYYY-MM-DD'); // You can change the format as needed
  };

  // Handle date change
  const handleDateChange = (newValue) => {
    const date = newValue || today; // Use today's date if newValue is null
    setSelectedDate(date);
    const formatted = formatDateToString(date);
    setFormattedDate(formatted);
  };
  
  // const [selectedDate, setselectedDate] = useState(null)
  return (
    <div className='flex flex-row-reverse '>
      <div className="mt-4  pr-2 text-lg w-4/5 text-right text-gray-700">
        {formattedDate}
      </div>

      <div className='flex-1 pt-1 '>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack spacing={2}>
            <DatePicker
              label="Date Picker"
              renderInput={(params) => <TextField {...params} sx={{width: '20px'}}/>}
              slotProps={{ textField: { size: 'small' } }}
              value={selectedDate}
              onChange={handleDateChange}
            />
          </Stack>
        </LocalizationProvider>
      </div>
      
  </div>
  )
}
