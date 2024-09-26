import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


export default function DateBox({ count, test,image}) {
  const theme = useTheme();

  return (
    <Card sx={{ display: 'flex', width: 400, height:80,marginLeft : 0, padding:2}}>
      <CardMedia
        component="img"
        sx={{ 
          width: 50, 
          height: 'auto', 
          objectFit: 'contain', 
          marginLeft: 5
        }} 
        image= {image}
        alt="Live from space album cover"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', ml:2}}>
        <CardContent sx={{ textAlign: 'center', padding: '8px 16px' }}>
          <Typography component="div" variant="h7">
            {count}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" component="div">
            {test}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
