import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import card2 from "../assets/Card2.png"

export default function MediaCard({categoryName,image}) {
  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardMedia
        sx={{ height:150 , objectFit: 'cover' }}
        image={image}
        title="green iguana"
      />
      <CardContent sx={{ paddingBottom: 0 }}>
        <Typography gutterBottom variant="h5" component="div">
          {categoryName}
        </Typography>

      </CardContent>
      <CardActions sx={{ paddingTop: 0 }}>
        <Button size="small">Read More</Button>
      </CardActions>
    </Card>
  );
}
