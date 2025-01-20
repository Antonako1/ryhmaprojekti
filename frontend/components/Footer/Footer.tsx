'use client';

import { Typography, Box, Container } from '@mui/material';

const Footer = () => {
  return (
    <div
    style={{
      position: 'relative',
      bottom: 0,
      width: '100%',
    }}
    >
      <Box
        component="footer"
        sx={{
          backgroundColor: 'red',
          color: 'white',
          padding: '10px 0',
          width: '100%',
        }}
      >
        <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <Box sx={{ textAlign: 'left' }}>
            <strong>Yhteystiedot</strong>
            <Typography>Osoite: Kasinokuja 10</Typography>
            <Typography>Puhelin: 04042069</Typography>
          </Box>

          <Typography variant="body1" sx={{ textAlign: 'center', flexGrow: 1 }}>
            &copy; {new Date().getFullYear()} Alc & Autos. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </div>
  );
};

export default Footer;
