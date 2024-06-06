import { createTheme } from '@mui/material/styles'

const newTheme = (theme) => createTheme({
  ...theme,
  components: {
    MuiPickersToolbar: {
      styleOverrides: {
        root: {
          color: '#bbdefb',
          borderRadius: '2px',
          borderWidth: '1px',
          borderColor: '#2196f3',
          border: '1px solid',
          backgroundColor: '#0d47a1',
        }
      }
    }
  }
})
<ThemeProvider theme={newTheme}>
  <StaticDatePicker />
</ThemeProvider> 