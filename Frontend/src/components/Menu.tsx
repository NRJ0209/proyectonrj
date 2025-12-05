import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { authActions } from '../store/authSlice';

import { AppBar,Toolbar,Typography,IconButton,Drawer,List,ListItem,ListItemButton,ListItemIcon,ListItemText,Box,
  useMediaQuery,useTheme,Divider,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

const MenuComponent: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Datos del usuario desde Redux
  const { userName, userRol, isAutenticated } = useSelector((state: RootState) => state.authenticator);

  useEffect(() => {
    if (!isAutenticated) {
      navigate('/')
    }
  }, [isAutenticated, navigate])

  //Función para abrir/cerrar drawer
  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  // Cerrar sesión
  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate('/');
    setDrawerOpen(false);
  };

  const getUserIcon = () => {
    if (userRol === 'admin' || userRol === 'administrador') {
      return <AdminPanelSettingsIcon />;
    } else if (userRol === 'user') {
      return <SupervisorAccountIcon />;
    }
    return <PersonIcon />;
  };

  // No mostrar menú si no está autenticado
  if (!isAutenticated) {
    return null;
  }

  const drawerContent = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {/* Información del usuario en el drawer */}
      <Box sx={{ p: 2, backgroundColor: 'primary.main', color: 'white' }}>
        <Typography variant="h6" noWrap>
          {userName}
        </Typography>
        <Typography variant="body2">
          {/*Mostrar icono del rol */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {getUserIcon()}
            {userRol}
          </Box>
        </Typography>
      </Box>

      <Divider />

      <List>
        <ListItem disablePadding>
          <Link to="/home" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Inicio" />
            </ListItemButton>
          </Link>
        </ListItem>

        {/* Renderizado condicional para Informes */}
        {(userRol === 'admin' || userRol === 'administrador') && (
          <ListItem disablePadding>
            <Link to="/reports" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
              <ListItemButton>
                <ListItemIcon>
                  <AssessmentIcon />
                </ListItemIcon>
                <ListItemText primary="Informes" />
              </ListItemButton>
            </Link>
          </ListItem>
        )}
      </List>

      <Divider />

      {/* Botón de cerrar sesión en el drawer */}
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Cerrar Sesión" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Mi App
          </Typography>

          {/*  Mostrar icono del rol en la barra superior */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {getUserIcon()}
            <Typography variant="body2">
              {userName} ({userRol})
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default MenuComponent;