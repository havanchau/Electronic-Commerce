import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <Typography variant="h1" component="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Oops! The page you're looking for doesn't exist.
      </Typography>
      <Button variant="contained" component={Link} href="/" sx={{ mt: 2 }}>
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
