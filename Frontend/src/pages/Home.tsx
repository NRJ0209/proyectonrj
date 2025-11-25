import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Typography, Container, Box } from '@mui/material';
import Dashboard from '../components/Dashboard';

export default function Home(){
  const userData = useSelector((state: RootState) => state.authenticator);
  
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

        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ textAlign: 'center', mt: 4, color: 'secondary.main' }}
        >
          Bienvenido, {userData.userName}
        </Typography>

        <Typography 
          variant="h5" 
          component="h3" 
          sx={{ textAlign: 'center', mt: 2 }}
        >
          Tu rol es: {userData.userRol}
        </Typography>

        <Dashboard />
      </Box>
    </Container>
  );
}

