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
    <Box sx={{ flexGrow: 1, marginTop: '8vh', height: '100vh', backgroundColor: 'white' }}>
      <Grid container spacing={2} sx={{ height: '35%' }}>
        <Grid size={{ xs: 12 }} sx={{ height: '100%'}}>
          <Item sx={{ height: '100%', position: 'relative'}}>
            <Image
              src="/zillow-front-2.jpeg"
              layout="fill"
              objectFit="cover"
              alt='Zillow front'
            />
          </Item>
        </Grid>
      </Grid>
      <Grid container spacing={4} sx={{ flexGrow: '1', height: '65%', width: '100%', display: 'flex', justifyContent: 'space-around', paddingLeft: '8%', paddingRight: '8%' }}>
        <Grid size={{ xs: 12, md: 4 }} sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Item sx={{height: '80%', width: '65%'}}>xs=6 md=4</Item>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }} sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Item sx={{height: '80%', width: '65%'}}>xs=6 md=4</Item>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }} sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Item sx={{height: '80%', width: '65%'}}>xs=6 md=4</Item>
        </Grid>
      </Grid>
    </Box>
  );
}
