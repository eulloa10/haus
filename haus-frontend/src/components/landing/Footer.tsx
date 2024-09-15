import * as React from 'react';
import Box from '@mui/material/Box';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1vw',
        backgroundColor: 'white',
        color: 'black',
        borderTop: '1px solid #D3D3D3',
        mt: 'auto'
      }}
    >
      <Link href={'https://www.linkedin.com/in/edgarulloa/'} target='_blank'>
          <Image
            src="/images/icons/linkedin.svg"
            width={30}
            height={30}
            alt="LinkedIn"
          />
      </Link>
      <Link href={'https://github.com/eulloa10'} target='_blank'>
          <Image
            src="/images/icons/github.svg"
            width={30}
            height={30}
            alt="GitHub"
          />
      </Link>
      <Link href={'https://edgarulloa.vercel.app/'} target='_blank'>
          <Image
            src="/images/icons/portfolio.png"
            width={30}
            height={30}
            alt="Portfolio"
          />
      </Link>
    </Box>
  );
}
