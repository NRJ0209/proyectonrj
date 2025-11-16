//Importamos el useSelector del react-redux
import { useSelector } from 'react-redux'
// Importamos lo que necesitamos para el tipo del selector()
import { RootState} from '../store/index'
//Importamos las acciones que están en el fichero authSlice.ts
import { authActions } from '../store/authSlice';
import { Typography, Container, Box, Button } from '@mui/material';
// Importamos useDispatch y useNavigate
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Home(){
//Almacenamos en la variable userData lo que obtenemos del store usando el hook useSelector
const userData = useSelector((state: RootState) => state.authenticator)
//Comprobamos por la consola qué obtenemos del store
console.log(userData)

// Inicializamos useDispatch y useNavigate
const dispatch = useDispatch();
const navigate = useNavigate();

// Función para manejar el logout
const handleLogout = () => {
  // 1. Hacer un dispatch al store para decirle que estamos en el estado logout:
  dispatch(authActions.logout())
  
  // 2. Navegar a la página principal de nuestra aplicación, que es /: 
  navigate('/')
}

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

      {/* AQUÍ AÑADIMOS A NUESTRO TYPOGRAPHY EL NOMBRE DE USUARIO Y SU ROL SACADOS DEL STORE */}
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

      {/* BOTÓN SALIR */}
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={handleLogout}
          sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
        >
          SALIR
        </Button>
      </Box>
    </Box>
  </Container>
)
}

