'use client'

import * as React from 'react';
import Image from 'next/image';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';

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

export default function Landing() {
  return (
    <Box sx={{ flexGrow: '1', display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#fdfdfd', overflow: 'hidden' }}>
      <Grid container sx={{ display: { xs: 'none', md: 'flex' }, flex: '0 0 40%'}}>
        <Grid size={{ xs: 12 }} sx={{ height: '100%'}}>
          <Item sx={{ height: '100%', position: 'relative'}}>
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
        <Grid className='landing-card-container' size={{ xs: 12, sm: 12,  md: 4 }} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Item className='landing-card' sx={{ height: '75%', width: '80%' }}>1</Item>
        </Grid>
        <Grid className='landing-card-container' size={{ xs: 12, sm: 12,  md: 4 }} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Item className='landing-card' sx={{ height: '75%', width: '80%' }}>2</Item>
        </Grid>
        <Grid className='landing-card-container' size={{ xs: 12, sm: 12,  md: 4 }} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Item className='landing-card' sx={{ height: '75%', width: '80%' }}>3</Item>
        </Grid>
      </Grid>
    </Box>
  );
}
