import React from 'react';
// Importar Button para exportación
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
// Importar iconos para exportación
import DownloadIcon from '@mui/icons-material/Download';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

interface ItemInforme {
  id: number;
  nombre: string;
  marca: string;
  tipo: string;
  precio: number;
}

interface InformeColeccionProps {
  datos: ItemInforme[];
}

const InformeColeccion: React.FC<InformeColeccionProps> = ({ datos }) => {
  // Calcular suma de precios
  const sumaTotal = datos.reduce((total, item) => total + (item.precio || 0), 0);

  // Función para exportar a CSV
  const exportarCSV = () => {
    const headers = ['Nombre', 'Marca', 'Tipo', 'Precio'];
    const csvContent = [
      headers.join(','),
      ...datos.map(item => [
        `"${item.nombre}"`,
        `"${item.marca}"`,
        `"${item.tipo}"`,
        item.precio
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `informe_coleccion.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Función para exportar a PDF
  const exportarPDF = () => {
    const ventana = window.open('', '_blank');
    if (ventana) {
      ventana.document.write(`
        <html>
          <head>
            <title>Informe Colección</title>
            <style>
              body { font-family: Arial; }
              h1 { color: #f0abe9ff; }
              table { border-collapse: collapse; width: 100%; }
              th { background-color: #e793c7ff; color: white; padding: 8px; }
              td { border: 1px solid #ddd; padding: 8px; }
              .total { font-weight: bold; background-color: #e3f2fd; }
            </style>
          </head>
          <body>
            <h1>Informe de Colección</h1>
            <table>
              <tr>
                <th>Nombre</th>
                <th>Marca</th>
                <th>Tipo</th>
                <th>Precio</th>
              </tr>
              ${datos.map(item => `
                <tr>
                  <td>${item.nombre}</td>
                  <td>${item.marca}</td>
                  <td>${item.tipo}</td>
                  <td>$${item.precio.toFixed(2)}</td>
                </tr>
              `).join('')}
              <tr class="total">
                <td colspan="3"><strong>SUMA TOTAL</strong></td>
                <td><strong>$${sumaTotal.toFixed(2)}</strong></td>
              </tr>
            </table>
          </body>
        </html>
      `);
      ventana.document.close();
      ventana.print();
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
      {/* Añadido botones de exportación */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" component="h2" color="secondary">
          Informe de Colección
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<DownloadIcon />}
            onClick={exportarCSV}
          >
            CSV
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            startIcon={<PictureAsPdfIcon />}
            onClick={exportarPDF}
          >
            PDF
          </Button>
        </Box>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.main' }}>
              <TableCell sx={{ color: 'white' }}>Nombre</TableCell>
              <TableCell sx={{ color: 'white' }}>Marca</TableCell>
              <TableCell sx={{ color: 'white' }}>Tipo</TableCell>
              <TableCell sx={{ color: 'white' }}>Precio</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datos.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.nombre}</TableCell>
                <TableCell>{item.marca}</TableCell>
                <TableCell>{item.tipo}</TableCell>
                <TableCell>${item.precio.toFixed(2)}</TableCell>
              </TableRow>
            ))}
            {/*  Fila con suma total */}
            <TableRow sx={{ backgroundColor: 'info.main' }}>
              <TableCell colSpan={3} align="right">
                <Typography color="white" fontWeight="bold">
                  SUMA TOTAL:
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="white" fontWeight="bold">
                  ${sumaTotal.toFixed(2)}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {datos.length === 0 && (
        <Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>
          No hay datos para mostrar
        </Typography>
      )}
    </Paper>
  );
};

export default InformeColeccion;