import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface CardDetails {
  id: number;
  Title: string;
  Action: string;
  Description: string;
  Image: string;
}

interface LandingCardProps {
  card: CardDetails;
}

export default function LandingCard(props: LandingCardProps) {
  const { card } = props;

  return (
    <Card sx={{ height: '85%', width: '85%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center' }}>
      <CardMedia
        component="img"
        sx={{
          height: '40%',
          width: '100%',
          maxHeight: { xs: '150px', sm: '150px', md: '150px', lg: '250px' },
          maxWidth: { xs: '200px', sm: '250px', md: '300px', lg: '300px' },
          objectFit: 'cover',
          objectPosition: 'center'
        }}
        image={card.Image}
        title={card.Title}
      />
      <CardContent
        sx={{
          height: '40%',
          padding: { xs: '8px', md: '16px' }, // Adjust padding for smaller screens
          flexGrow: 1,  // Allow content to grow with available space
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
          <Typography gutterBottom variant="h5" component="div" sx={{ height: '50%', width: '100%', fontSize: { xs: '1.25rem', md: '1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}}>
            {card.Title}
          </Typography>
          <Typography variant="body2" sx={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', color: 'text.secondary', fontSize: { xs: '0.875rem', md: '1rem' }, textAlign: 'center' }}>
            {card.Description}
          </Typography>
      </CardContent>
      <CardActions sx={{ height: '20%', paddingBottom: { xs: '5%', md: '20%' } }}>
        <Button size="small" sx={{ fontSize: { xs: '0.875rem', md: '1rem' }, border: '1px solid #2671fe'}}>{card.Action}</Button>
      </CardActions>
    </Card>
  );
}
