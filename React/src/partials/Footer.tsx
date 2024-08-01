import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ position: 'fixed', bottom: 0, width: '100%', textAlign: 'center', py: 2, backgroundColor: 'primary.main', color: 'white' }}>
      <Typography variant="body1">
        © 2024 My App
      </Typography>
    </Box>
  );
};

export default Footer;
