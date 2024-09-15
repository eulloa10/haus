'use client'

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

const cardDetails = {
  "Buy a home" : {
    "Description" : "Find your place with an immersive photo experience and the most listings, including things you don't find anywhere else.",
    "Image" : "/"
  },
  "Sell a home": {
    "Description" : "Ready to sell? Take advantage of our network and expertise.",
    "Image": "/"
  },
  "Tour a home": {
    "Description": "See a home you like? Schedule a tour now with one of our agents.",
    "Image": "/"
  }
}

export default function ActionAreaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        {
          cardDetails.map(card => {
            <>
              <CardMedia
                component="img"
                height="140"
                image="/static/images/cards/contemplative-reptile.jpg"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Lizards are a widespread group of squamate reptiles, with over 6,000
                  species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </>
          })
        }

      </CardActionArea>
    </Card>
  );
}
