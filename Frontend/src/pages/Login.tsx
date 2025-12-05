import { Container, Typography, Button, Box, TextField, Alert, Paper } from '@mui/material';
import { Lock } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Importamos el useDispatch de react-redux
import { useDispatch } from 'react-redux';
// Importamos las acciones que están en el fichero authSlice.ts
import { authActions } from '../store/authSlice';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  // Justo después de la definición de la función Login() ponemos el hook useDispatch:
  const dispatch = useDispatch();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    // Limpiar alertas anteriores
    setShowSuccess(false);
    setShowError(false);

    // Mostrar en consola los datos introducidos
    console.log('Usuario introducido:', username);
    console.log('Contraseña introducida:', password);

    try {
      // Consulta al endpoint /login en lugar de validación local
      const response = await fetch(`http://localhost:3030/login?user=${username}&password=${password}`);
      
      const result = await response.json();
      console.log('Resultado del login:', result);

      // Validación con datos de la base de datos
      if (result.data && result.data.length > 0) {
        console.log('Credenciales CORRECTAS');
        setShowSuccess(true);

        // Usa datos reales de la base de datos
        dispatch(authActions.login({
          name: result.data[0].nombre,  // Nombre real de la BD
          rol: result.data[0].rol        // Rol real de la BD
        }))

        // Navegar a /home después de mostrar el alert brevemente
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      } else {
        console.log('Credenciales INCORRECTAS');
        setShowError(true);
      }
    } catch (error) {
      console.error('Error al realizar login:', error);
      setShowError(true);
    }
  };

  return (
    <>
      <header>
        <Typography
          variant="h1"
          color="primary"
          sx={{ 
            textAlign: 'center', 
            fontSize: '2rem', 
            mt: 8,
            mb: 2,
            fontWeight: 'bold'
          }}
        >
          Sistema de acceso
        </Typography>
      </header>

      <main>
        <Container 
          component="main" 
          maxWidth="xs"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              borderRadius: 2,
            }}
          >
            {/* Icono de candado */}
            <Box
              sx={{
                backgroundColor: 'primary.main',
                color: 'white',
                borderRadius: '50%',
                width: 60,
                height: 60,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2
              }}
            >
              <Lock sx={{ fontSize: 30 }} />
            </Box>

            {/* Formulario de Login */}
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                width: '100%',
                mt: 1,
              }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Usuario"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {/* Alertas de éxito y error */}
              {showSuccess && (
                <Alert severity="success" sx={{ mt: 2 }}>
                  Acceso concedido - Redirigiendo a Home...
                </Alert>
              )}

              {showError && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  Usuario y/o contraseña incorrectos
                </Alert>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ 
                  mt: 3, 
                  mb: 2,
                  py: 1.5,
                  fontSize: '1.1rem'
                }}
              >
                ACCEDER
              </Button>
            </Box>
          </Paper>
        </Container>
      </main>
    </>
  );
}

export default Login;