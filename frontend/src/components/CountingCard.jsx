import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import card3 from "../assets/Card3.png";

export default function MediaControlCard({ count, test }) {
  const theme = useTheme();

  return (
    <Card sx={{ display: 'flex' }}>
      <CardMedia
        component="img"
        sx={{ 
          width: 50, 
          height: 'auto', 
          objectFit: 'contain', 
          marginLeft: 5 
        }}  
        image={card3}
        alt="Live from space album cover"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', ml: 4 }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
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
