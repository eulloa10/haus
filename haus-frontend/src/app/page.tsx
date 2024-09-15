import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import Landing from '@/components/landing/Landing';
import Box from '@mui/material/Box';

export default function Home() {
  return (
    <Box sx={{ minHeight: '100vh', display:'flex', flexDirection: 'column'}}>
      <Box sx={{ position: 'fixed', width: '100%',  height: '10vh', zIndex: '1' }}>
        <Header />
      </Box>
      <Box sx={{ flexGrow:'1', height: '120vh', marginTop: '10vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Landing />
      </Box>
      <Box sx={{ height: '5vh' }}>
        <Footer />
      </Box>
    </Box>
  );
}
