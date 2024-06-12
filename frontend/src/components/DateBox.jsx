import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import card1 from "../assets/Card1.jpg";

export default function DateBox({ count, test,image}) {
  const theme = useTheme();

  return (
    <Card sx={{ display: 'flex', width: 500, height:100,marginLeft : 0}}>
      <CardMedia
        component="img"
        sx={{ width:20, height: 80, minWidth:80, objectFit: 'cover', marginLeft: 2 , mt:1 }} 
        image= {image}
        alt="Live from space album cover"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', ml:2}}>
        <CardContent sx={{ textAlign: 'center', padding: '8px 16px' }}>
          <Typography component="div" variant="h5">
            {count}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {test}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
