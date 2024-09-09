import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Landing from '@/components/Landing';
import Box from '@mui/material/Box';

export default function Home() {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Header />
      <Box sx={{ flexGrow: 1, minHeight: 'calc(100vh - 8vh - 4vh)' }}>
        <Landing />
      </Box>
      <Footer />
    </Box>
  );
}
