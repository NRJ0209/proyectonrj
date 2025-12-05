import { Typography, Container, Box, Button, Alert } from '@mui/material';
//Importar useSelector para verificar permisos
import { useSelector } from 'react-redux';
import { RootState } from '../store';
// Importar useState para manejar estados
import { useState } from 'react';
// Importar componente de informe
import InformeColeccion from '../components/InformeColeccion';

function Reports() {
  // Obtener el rol del usuario desde Redux
  const { userRol } = useSelector((state: RootState) => state.authenticator);
  
  // Estados para el informe
  const [datosInforme, setDatosInforme] = useState([]);
  const [mostrarInforme, setMostrarInforme] = useState(false);
  const [cargando, setCargando] = useState(false);

  // Verificar si el usuario tiene permisos
  if (userRol !== 'admin' && userRol !== 'administrador') {
    return (
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Alert severity="error" sx={{ mt: 4 }}>
            No tienes permisos para acceder a esta página. Solo los administradores pueden ver informes.
          </Alert>
        </Box>
      </Container>
    );
  }

  // Función para generar el informe
  const generarInforme = async () => {
    setCargando(true);
    setMostrarInforme(false);
    
    try {
      // Obtener datos de la base de datos
      const response = await fetch('http://localhost:3030/getItems');
      const result = await response.json();
      
      // Almacenar los datos en el estado
      setDatosInforme(result.data);
      // Activar la variable de control para mostrar el informe
      setMostrarInforme(true);
    } catch (error) {
      console.error('Error al obtener datos para el informe:', error);
    } finally {
      setCargando(false);
    }
  };

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
          Página de Informes
        </Typography>
        
        <Typography 
          variant="h5" 
          component="h2" 
          gutterBottom
          sx={{ textAlign: 'center', mt: 2, color: 'primary.main' }}
        >
          Generación de Informes del Sistema
        </Typography>

        {/* AÑADIDO: Botón para generar el informe */}
        <Box sx={{ textAlign: 'center', mt: 4, mb: 4 }}>
          <Button 
            variant="contained" 
            color="primary"
            size="large"
            onClick={generarInforme}
            disabled={cargando}
            sx={{ 
              px: 4, 
              py: 1.5, 
              fontSize: '1.1rem',
              fontWeight: 'bold'
            }}
          >
            {cargando ? 'CARGANDO...' : 'INFORME COLECCION'}
          </Button>
        </Box>

        {/* Renderizado condicional del componente de informe */}
        {mostrarInforme && (
          <InformeColeccion datos={datosInforme} />
        )}
      </Box>
    </Container>
  );
}

export default Reports;