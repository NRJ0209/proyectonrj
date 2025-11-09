import { Container, Typography, Button, Box } from '@mui/material';

function Login() {
  return (
    <>
      <header>
        <Typography
          variant="h1"
          color="primary"
          sx={{ textAlign: 'center', fontSize: '2rem', mt: 3 }}
        >
          Página Login de Nayra Ramirez Jorge
        </Typography>
      </header>

      <main>
        <Container
          sx={{
            textAlign: 'left',
            mt: 4,
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: 'background.paper',
          }}
        >
           {/* Textos */}
          <Typography variant="h2" color="secondary" sx={{ fontSize: '1.5rem', mb: 1 }}>
            Módulo: DAD
          </Typography>

          <Typography variant="h3" color="error" sx={{ fontSize: '1.3rem', mb: 1 }}>
            Curso: 2ºA DAM
          </Typography>

          <Typography variant="subtitle1" color="success.main" sx={{ mb: 1 }}>
            Profesora: María Concepción Hernández Rodríguez
          </Typography>

          <Typography variant="body1" color="text.primary" sx={{ mb: 1 }}>
            Esta es mi actividad UT2A1 - AE2.3 - Estructura del proyecto y Guía de estilos 25_26
          </Typography>

          <Typography variant="caption" color="warning.main" sx={{ display: 'block', mb: 3 }}>
            ¡Aviso!
          </Typography>

          {/* Botones */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
              mt: 2,
            }}
          >
            <Button variant="text" color="primary">
              Botón Text
            </Button>

            <Button variant="contained" color="secondary">
              Botón Contained
            </Button>

            <Button variant="outlined" color="error">
              Botón Outlined
            </Button>
          </Box>
        </Container>
      </main>

      <footer>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: 'center', mt: 4, mb: 2 }}
        >
          Proyecto UT2A1 - Nayra Ramírez Jorge
        </Typography>
      </footer>
    </>
  );
}

export default Login;
