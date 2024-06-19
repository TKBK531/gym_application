import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard({ categoryName, image, onReadMoreClick }) {
  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardMedia
        sx={{ height: 150, objectFit: 'cover' }}
        image={image}
        title={categoryName}
      />
      <CardContent sx={{ paddingBottom: 0 }}>
        <Typography variant="h6" component="div">
          {categoryName}
        </Typography>
      </CardContent>
      <CardActions sx={{ paddingTop: 0 }}>
        <Button size="small" onClick={onReadMoreClick}>Read More</Button>
      </CardActions>
    </Card>
  );
}
