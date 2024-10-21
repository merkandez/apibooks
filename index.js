import connection_db from './database/connectionDb.js';
import bookModel from './models/bookModel.js';
import userModel from './models/userModel.js';
import express from 'express';
import bookRouter from './routes/routes.js';
import authRouter from './routes/authRoutes.js';
import cors from 'cors';

export const app = express();
app.use(express.json());
app.use(cors());
app.get('/Hola', (req, res) => {
  res.send('Hola primera API');
});

app.use('/books', bookRouter);
app.use('/auth', authRouter);

// Mueve la lógica de inicio del servidor a `startServer` y retorna la instancia del servidor
export const startServer = async () => {
  try {
    await connection_db.authenticate(); // Conexión a la base de datos
    console.log('Conexión exitosa 🚀');

    await bookModel.sync({ force: false }); // Sincroniza el modelo de libros
    console.log('La tabla fue (re)creada con éxito');

    await userModel.sync({ force: false }); // Sincroniza el modelo de usuarios
    console.log('La tabla fue (re)creada con éxito');

    // Inicia el servidor y devuelve la instancia
    const server = app.listen(8080, () => {
      console.log('Servidor levantado en http://localhost:8080');
    });

    return server; // Retorna la instancia del servidor
  } catch (error) {
    console.error('Conexión fallida 🚫', error);
  }
};
startServer();
