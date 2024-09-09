import * as React from 'react';
import Box from '@mui/material/Box';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        height: '4vh',
        width: '100%',
        backgroundColor: 'white',
        borderTop: '1px solid #D3D3D3',
        mt: 'auto'
      }}
    >
      This is the footer.
    </Box>
  );
}
