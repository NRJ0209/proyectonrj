import { Typography, Container, Box } from '@mui/material';

function Home() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom 
          color="primary"
          sx={{ textAlign: 'center', mt: 4 }}
        >
          Página Home de Nayra
        </Typography>
      </Box>
    </Container>
  );
}

export default Home;