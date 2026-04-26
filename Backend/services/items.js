const db = require('./db')
const helper = require('../helper')
const config = require('../config')

// Función para insertar datos
async function insertData(req, res) {
  // data tiene los datos que vamos a insertar en la base de datos
  const data = req.query
  const result = await db.query(
    `INSERT INTO coleccion (nombre, marca, tipo, precio) VALUES (?, ?, ?, ?)`,
    [data.nombre, data.marca, data.tipo, data.precio]
  )
  // Si affectedRows > 0 significa que se insertó correctamente
  return result.affectedRows
}

// Función para obtener datos
async function getData(req, res) {
  const rows = await db.query(`SELECT * FROM coleccion`)
  const data = helper.emptyOrRows(rows)
  return { data }
}

// Función para borrar datos
async function deleteData(req, res) {
  const data = req.query
  const result = await db.query(
    `DELETE FROM coleccion WHERE id = ?`,
    [data.id]
  )
  return result.affectedRows
}

module.exports = {
  getData,
  insertData,
  deleteData
}