import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip
} from '@mui/material';
// Importar DeleteForeverIcon
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface ItemType {
  id?: number;
  nombre: string;
  marca: string;
  tipo: string;
  precio: number;
}

const itemInitialState: ItemType = {
  nombre: '',
  marca: '',
  tipo: '',
  precio: 0
};

const Dashboard: React.FC = () => {
  const [item, setItem] = useState<ItemType>(itemInitialState);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [tableData, setTableData] = useState<ItemType[]>([]);
  

  const { userRol } = useSelector((state: RootState) => state.authenticator);

  useEffect(() => {
    fetchTableData();
  }, []);

  const fetchTableData = async () => {
    try {
      const response = await fetch('http://localhost:3030/getItems');
      const result = await response.json();
      setTableData(result.data);
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItem(prevItem => ({
      ...prevItem,
      [name]: name === 'precio' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setShowSuccess(false);
    setShowError(false);

    try {
      const response = await fetch(`http://localhost:3030/addItem?nombre=${item.nombre}&marca=${item.marca}&tipo=${item.tipo}&precio=${item.precio}`);

      const result = await response.json();

      if (result > 0) {
        alert('Datos guardados con éxito');
        setShowSuccess(true);
        setItem(itemInitialState);
        fetchTableData();
      } else {
        setShowError(true);
      }
    } catch (error) {
      console.error('Error al insertar datos:', error);
      setShowError(true);
    }
  };

  // Función handleDeleteItem para borrar registros
  const handleDeleteItem = async (row: ItemType) => {
    if (!row.id) return;

    try {
      const response = await fetch(`http://localhost:3030/deleteItem?id=${row.id}`);
      const result = await response.json();

      if (result > 0) {
        alert('Registro eliminado correctamente');
        fetchTableData();
      } else {
        alert('Error al eliminar el registro');
      }
    } catch (error) {
      console.error('Error al eliminar:', error);
      alert('Error al eliminar el registro');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Formulario */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Formulario para Insertar Datos
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nombre"
                name="nombre"
                value={item.nombre}
                onChange={handleInputChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Marca"
                name="marca"
                value={item.marca}
                onChange={handleInputChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Tipo"
                name="tipo"
                value={item.tipo}
                onChange={handleInputChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Precio"
                name="precio"
                type="number"
                value={item.precio}
                onChange={handleInputChange}
                inputProps={{ step: "0.01" }}
                required
              />
            </Grid>

            <Grid item xs={12}>
              {/* ponemos arrow para que tenga una flecha y placement para colocar el tooltip en la parte superior */}
              <Tooltip title="Se añadirán los datos a la base de datos" arrow placement="top">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  + INSERTAR DATOS
                </Button>
              </Tooltip>
            </Grid>

          </Grid>
        </form>

        {showSuccess && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Datos insertados correctamente en la base de datos
          </Alert>
        )}

        {showError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            Error al insertar los datos
          </Alert>
        )}
      </Paper>

      {/* Tabla de Datos */}
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Tabla de Datos
        </Typography>

        <TableContainer>
          <Table aria-label='Tabla de productos'>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Marca</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Precio</TableCell>
                {/* Renderizado condicional para columna Acciones */}
                {(userRol === 'admin' || userRol === 'administrador') && (
                  <TableCell>Acciones</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row: ItemType) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.nombre}</TableCell>
                  <TableCell>{row.marca}</TableCell>
                  <TableCell>{row.tipo}</TableCell>
                  <TableCell>${row.precio}</TableCell>
                  {/* Renderizado condicional para botón Eliminar */}
                  {(userRol === 'admin' || userRol === 'administrador') && (
                    <TableCell>
                      <Tooltip title="Se eliminarán los datos definitivamente" arrow placement="right">
                        <Button
                          color="error"
                          onClick={() => handleDeleteItem(row)}
                          startIcon={<DeleteForeverIcon />}
                        >
                          Eliminar
                        </Button>
                      </Tooltip>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {tableData.length === 0 && (
          <Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>
            No hay datos para mostrar
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default Dashboard;