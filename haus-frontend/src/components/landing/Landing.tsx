'use client'

import * as React from 'react';
import Image from 'next/image';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import LandingCard from './LandingCard';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

const cardDetails = [
  {
    "id": 1,
    "Title": "Buy a home",
    "Action": "Browse Homes",
    "Description" : "Find your place with an immersive photo experience and the most listings, including things you don't find anywhere else.",
    "Image" : "/images/cards/buy-home-card.png"
  },
  {
    "id": 2,
    "Title": "Sell a home",
    "Action": "Sell a home",
    "Description" : "Ready to sell? Take advantage of our network and expertise.",
    "Image": "/images/cards/sell-home-card.png"
  },
  {
    "id": 3,
    "Title": "Tour a home",
    "Action": "Find a home to tour",
    "Description": "See a home you like? Schedule a tour now with one of our agents.",
    "Image": "/images/cards/tour-home-card.png"
  }
]

export default function Landing() {
  return (
    <Box sx={{ flexGrow: '1', display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#fdfdfd', overflow: 'hidden' }}>
      <Grid container sx={{ display: { xs: 'none', md: 'flex' }, flex: '0 0 40%'}}>
        <Grid size={{ xs: 12 }} sx={{ height: '100%'}}>
          <Item sx={{ height: '100%', position: 'relative' }}>
            <Image
              src="/landing-home-view.jpeg"
              layout="fill"
              objectFit="cover"
              alt='View of home entrance'
            />
          </Item>
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'space-around', paddingLeft: '8%', paddingRight: '8%' }}>
              {
                cardDetails.map(card => (
                  <Grid key={card.id} className='landing-card-container' size={{ xs: 12, sm: 12,  md: 4 }} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <LandingCard card={card} />
                  </Grid>
                ))
              }
      </Grid>
    </Box>
  );
}
