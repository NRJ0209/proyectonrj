import { Typography, Container, Box } from '@mui/material';

function Reports() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom 
          color="secondary"
          sx={{ textAlign: 'center', mt: 4 }}
        >
          Página Reports de Nayra
        </Typography>
      </Box>
    </Container>
  );
}

export default Reports;