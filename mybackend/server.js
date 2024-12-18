const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' })); // Aumentar el límite de tamaño de solicitud

// Configuración de multer para manejar la carga de imágenes
const storage = multer.memoryStorage(); // Almacena archivos en memoria
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // Limitar el tamaño de la imagen a 10MB
});

const db = mysql.createConnection({
  host: 'localhost',
  user: 'ADMIN',
  password: 'Tania123',
  database: 'asistencia'
});
  
db.connect(err => {
  if (err) {
    console.error('Error conectando a MySQL:', err);
    return;
  }
  console.log('Conectado a MySQL');
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.post('/api/RegisterEst', (req, res) => {
  const { nombre, apellido, segundoApellido, correo, contrasena } = req.body.usuario;

  // Verificar si todos los campos son proporcionados
  if (!nombre || !apellido || !segundoApellido || !correo || !contrasena) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Consulta para insertar un nuevo estudiante en la base de datos
  const query = `INSERT INTO estudiante (nombre, apellido, segundoApellido, correo, contrasena) 
                 VALUES (?, ?, ?, ?, ?)`;

  db.query(query, [nombre, apellido, segundoApellido, correo, contrasena], (err, results) => {
    if (err) {
      console.error('Error al insertar el estudiante:', err);
      return res.status(500).json({ error: 'Error al ingresar al estudiante' });
    }
    res.json({ message: 'Estudiante registrado exitosamente', id: results.insertId });
  });
});
app.post('/api/RegisterProf', (req, res) => {
  const { nombre, apellido, segundoApellido, correo, contrasena } = req.body.usuario;

  // Verificar si todos los campos son proporcionados
  if (!nombre || !apellido || !segundoApellido || !correo || !contrasena) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Consulta para insertar un nuevo estudiante en la base de datos
  const query = `INSERT INTO profesor (nombre, apellido, segundoApellido, correo, contrasena) 
                 VALUES (?, ?, ?, ?, ?)`;

  db.query(query, [nombre, apellido, segundoApellido, correo, contrasena], (err, results) => {
    if (err) {
      console.error('Error al insertar el estudiante:', err);
      return res.status(500).json({ error: 'Error al ingresar al estudiante' });
    }
    res.json({ message: 'Estudiante registrado exitosamente', id: results.insertId });
  });
});

// Rutas para login
app.post('/api/LoginEst', (req, res) => {
  const { correo, contrasena } = req.body.usuario;

  if (!correo || !contrasena) {
    return res.status(400).json({ error: 'Correo y contraseña son obligatorios' });
  }

  // Consulta para verificar el estudiante
  const query = `SELECT * FROM estudiante WHERE correo = ? AND contrasena = ?`;
  
  db.query(query, [correo, contrasena], (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      return res.status(500).json({ error: 'Error en la consulta de login' });
    }

    if (results.length > 0) {
      // Login exitoso para estudiante
      res.json({ message: 'Login exitoso', usuario: results[0] });
    } else {
      // Si no se encuentra al estudiante
      res.status(400).json({ error: 'Credenciales incorrectas' });
    }
  });
});

app.post('/api/LoginProf', (req, res) => {
  const { correo, contrasena } = req.body.usuario;

  if (!correo || !contrasena) {
    return res.status(400).json({ error: 'Correo y contraseña son obligatorios' });
  }

  // Consulta para verificar el profesor
  const query = `SELECT * FROM profesor WHERE correo = ? AND contrasena = ?`;
  
  db.query(query, [correo, contrasena], (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      return res.status(500).json({ error: 'Error en la consulta de login' });
    }

    if (results.length > 0) {
      // Login exitoso para profesor
      res.json({ message: 'Login exitoso', usuario: results[0] });
    } else {
      // Si no se encuentra al profesor
      res.status(400).json({ error: 'Credenciales incorrectas' });
    }
  });
});

app.post('/api/recuperarContrasena', (req, res) => {
  const { correo } = req.body; // Obtener el correo del cuerpo de la solicitud

  if (!correo) {
    return res.status(400).json({ error: 'Correo es obligatorio' });
  }

  // Consulta SQL para recuperar la contraseña del usuario
  const query = 'SELECT contrasena FROM estudiante WHERE correo = ?';

  db.query(query, [correo], (err, results) => {
    if (err) {
      console.error('Error al recuperar la contraseña:', err);
      return res.status(500).json({ error: 'Error al recuperar la contraseña' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Devolver la contraseña al usuario
    res.json({ contrasena: results[0].contrasena });
  });
});
