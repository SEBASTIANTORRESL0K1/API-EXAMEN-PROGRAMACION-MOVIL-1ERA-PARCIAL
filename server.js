const express = require('express');
require('dotenv').config();
const db = require('./db/db');
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Verificación de conexión a la base de datos
db.getConnection()
  .then(connection => {
    console.log('Conectado a la base de datos MySQL.');
    connection.release(); // Libera la conexión
  })
  .catch(err => {
    console.error('Error al conectar con la base de datos:', err);
  });

// Rutas para el CRUD
// Ruta para obtener todos los lugares
app.get('/api/lugares', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM lugares_visitados');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ruta para agregar un nuevo lugar
app.post('/api/lugares', async (req, res) => {
  const { nombre, descripcion, fecha_visita, imagen_url } = req.body;
  try {
    const [result] = await db.execute(
      'INSERT INTO lugares_visitados (nombre, descripcion, fecha_visita, imagen_url) VALUES (?, ?, ?, ?)',
      [nombre, descripcion, fecha_visita, imagen_url]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Ruta para eliminar un lugar por su ID
app.delete('/api/lugares/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.execute('DELETE FROM lugares_visitados WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Lugar no encontrado' });
    }
    res.json({ message: 'Lugar eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});