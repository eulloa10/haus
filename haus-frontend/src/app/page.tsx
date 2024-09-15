import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Landing from '@/components/Landing';
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
