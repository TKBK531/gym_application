import React,{useState} from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Stack, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'


export default function Date() {
  const [selectedDate, setselectedDate] = useState(null)
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={2} sx={{height:'2px'}}>
        <DatePicker
        label='Date Picker'
        renderInput = {(params)=><TextField {...params}/>}
        slotProps={{ textField: { size: 'small' } }}
        value={selectedDate}
        onChange={(newValue)=>{setselectedDate(newValue)}}
        />
      </Stack>
    </LocalizationProvider>
  )
}
