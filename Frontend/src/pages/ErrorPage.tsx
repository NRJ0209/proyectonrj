import { useRouteError } from 'react-router-dom';
import { Container, Typography, Box, Button, Paper } from '@mui/material';
import { Error as ErrorIcon, Home } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function ErrorPage() {
  const error = useRouteError() as any;
  const navigate = useNavigate();

  console.error(error);

  return (
    <Container 
      component="main" 
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <ErrorIcon 
          sx={{ 
            fontSize: 80, 
            color: 'error.main',
            mb: 2 
          }} 
        />
        
        <Typography variant="h2" component="h1" gutterBottom color="error">
          ¡Oops! Página no encontrada
        </Typography>
        
        <Typography variant="h5" component="h2" gutterBottom>
          Error 404
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 3 }}>
          La página que estás buscando no existe o ha ocurrido un error inesperado.
        </Typography>

        {error?.statusText || error?.message ? (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            <strong>Detalles del error:</strong> {error.statusText || error.message}
          </Typography>
        ) : null}

        <Button
          variant="contained"
          startIcon={<Home />}
          onClick={() => navigate('/')}
          size="large"
        >
          Volver al Login
        </Button>
      </Paper>
    </Container>
  );
}

export default ErrorPage;